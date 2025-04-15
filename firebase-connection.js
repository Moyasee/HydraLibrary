import { db } from './firebase.js';
import { ref, onDisconnect, onValue, set, serverTimestamp, goOffline, goOnline } from 'firebase/database';

// Configuration
const CONNECTION_TIMEOUT = 5 * 60 * 1000; // 5 minutes idle timeout
const CONNECTION_REFRESH_INTERVAL = 60 * 1000; // Check connections every minute
const CONNECTION_HEARTBEAT_INTERVAL = 3 * 60 * 1000; // Send heartbeat every 3 minutes

class FirebaseConnectionManager {
  constructor() {
    this.isConnected = false;
    this.connectionRef = ref(db, '.info/connected');
    this.presenceRef = null;
    this.clientId = this.generateClientId();
    this.heartbeatTimer = null;
    this.disconnectTimer = null;
  }

  // Generate a unique client ID
  generateClientId() {
    return 'client_' + Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15) + 
           '_' + Date.now();
  }

  // Initialize connection
  async initialize() {
    // Only initialize once
    if (this.isConnected) return;

    try {
      // Set up the presence system
      this.presenceRef = ref(db, `presence/${this.clientId}`);
      
      // Listen for connection state changes
      onValue(this.connectionRef, (snapshot) => {
        if (snapshot.val() === true) {
          // We're connected, setup onDisconnect and update presence
          this.isConnected = true;
          
          // When disconnected, remove this client from presence list
          onDisconnect(this.presenceRef).remove();
          
          // Record connection time and setup automatic cleanup
          this.updatePresence();
          this.setupHeartbeat();
          this.setupDisconnectTimeout();
        } else {
          // We're disconnected
          this.isConnected = false;
          this.clearTimers();
        }
      });
      
      return true;
    } catch (error) {
      console.error('Failed to initialize Firebase connection:', error);
      return false;
    }
  }
  
  // Update presence with latest timestamp
  updatePresence() {
    if (!this.presenceRef) return;
    
    try {
      set(this.presenceRef, {
        online: true,
        lastActive: serverTimestamp()
      });
    } catch (error) {
      console.error('Failed to update presence:', error);
    }
  }
  
  // Set up heartbeat to keep connection alive and update activity
  setupHeartbeat() {
    this.clearTimers();
    
    this.heartbeatTimer = setInterval(() => {
      if (document.visibilityState === 'visible') {
        this.updatePresence();
      }
    }, CONNECTION_HEARTBEAT_INTERVAL);
  }
  
  // Set up auto-disconnect after timeout
  setupDisconnectTimeout() {
    this.clearDisconnectTimer();
    
    this.disconnectTimer = setTimeout(() => {
      if (document.visibilityState !== 'visible') {
        this.disconnect();
      }
    }, CONNECTION_TIMEOUT);
  }
  
  // Manually disconnect from Firebase
  disconnect() {
    if (!this.isConnected) return;
    
    try {
      // Remove presence
      if (this.presenceRef) {
        set(this.presenceRef, null);
      }
      
      // Go offline
      goOffline(db);
      this.isConnected = false;
      this.clearTimers();
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  }
  
  // Reconnect to Firebase
  reconnect() {
    if (this.isConnected) return;
    
    try {
      goOnline(db);
      // Generate a new client ID to avoid conflicts
      this.clientId = this.generateClientId();
      this.presenceRef = ref(db, `presence/${this.clientId}`);
      this.updatePresence();
      this.setupHeartbeat();
      this.setupDisconnectTimeout();
      this.isConnected = true;
    } catch (error) {
      console.error('Failed to reconnect:', error);
    }
  }
  
  // Clear all timers
  clearTimers() {
    this.clearHeartbeatTimer();
    this.clearDisconnectTimer();
  }
  
  // Clear heartbeat timer
  clearHeartbeatTimer() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }
  
  // Clear disconnect timer
  clearDisconnectTimer() {
    if (this.disconnectTimer) {
      clearTimeout(this.disconnectTimer);
      this.disconnectTimer = null;
    }
  }
  
  // Reset disconnect timeout (call on user activity)
  resetDisconnectTimeout() {
    if (this.isConnected) {
      this.setupDisconnectTimeout();
      this.updatePresence();
    }
  }
}

// Create singleton instance
const connectionManager = new FirebaseConnectionManager();

// Event listeners for document visibility and user activity
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    // User returned to the page, reconnect if needed
    if (!connectionManager.isConnected) {
      connectionManager.reconnect();
    } else {
      connectionManager.resetDisconnectTimeout();
      connectionManager.updatePresence();
    }
  } else if (document.visibilityState === 'hidden') {
    // Page is hidden, start the disconnect timer
    connectionManager.setupDisconnectTimeout();
  }
});

// Listen for user activity to reset the timeout
['click', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(eventName => {
  document.addEventListener(eventName, () => {
    connectionManager.resetDisconnectTimeout();
  }, { passive: true });
});

// Handle page unload
window.addEventListener('beforeunload', () => {
  connectionManager.disconnect();
});

export default connectionManager; 