/**
 * This file contains reference code for creating a Firebase Cloud Function
 * that cleans up stale connections. To use this, you'll need to:
 * 
 * 1. Install Firebase CLI: npm install -g firebase-tools
 * 2. Initialize Firebase Functions in your project: firebase init functions
 * 3. Copy this code to your functions/index.js file
 * 4. Deploy the function: firebase deploy --only functions
 */

// Example implementation for functions/index.js

/*
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Cloud Function that runs every 5 minutes to clean up inactive connections
exports.cleanupInactiveConnections = functions.pubsub
  .schedule('every 5 minutes')
  .onRun(async (context) => {
    const db = admin.database();
    const now = Date.now();
    
    // Maximum idle time before considering a connection stale (10 minutes)
    const MAX_IDLE_TIME = 10 * 60 * 1000;
    
    try {
      // Get all presence records
      const presenceRef = db.ref('presence');
      const snapshot = await presenceRef.once('value');
      const presenceData = snapshot.val();
      
      if (!presenceData) {
        console.log('No presence data found');
        return null;
      }
      
      // Check each client's last activity time
      const staleClientIds = [];
      
      for (const clientId in presenceData) {
        const clientData = presenceData[clientId];
        
        // If lastActive is a server value, need to convert it
        let lastActiveTime = 0;
        
        if (clientData && clientData.lastActive) {
          // Check if it's a server timestamp object or a direct timestamp
          if (typeof clientData.lastActive === 'object' && clientData.lastActive['.sv']) {
            // This is a server timestamp placeholder, consider it fresh
            continue;
          } else {
            lastActiveTime = clientData.lastActive;
          }
        }
        
        // Check if the client has been inactive too long
        const idleTime = now - lastActiveTime;
        
        if (idleTime > MAX_IDLE_TIME) {
          staleClientIds.push(clientId);
        }
      }
      
      console.log(`Found ${staleClientIds.length} stale connections to remove`);
      
      // Remove stale connections
      const removePromises = staleClientIds.map(clientId => {
        return presenceRef.child(clientId).remove();
      });
      
      await Promise.all(removePromises);
      
      console.log(`Successfully removed ${staleClientIds.length} stale connections`);
      return null;
    } catch (error) {
      console.error('Error cleaning up connections:', error);
      return null;
    }
  });
*/

/**
 * To set up Firebase Admin SDK on your server or as a scheduled job:
 * 
 * 1. Install packages: npm install firebase-admin node-cron
 * 2. Download your service account key from Firebase Console > Project Settings > Service Accounts
 * 3. Use the following code to set up a scheduled cleanup task
 */

/*
const admin = require('firebase-admin');
const cron = require('node-cron');
const serviceAccount = require('./path-to-service-account.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://hydra-library-2-default-rtdb.firebaseio.com'
});

// Schedule cleanup every 5 minutes
cron.schedule('*//*5 * * * *', async () => {
  console.log('Running connection cleanup task...');
  
  const db = admin.database();
  const now = Date.now();
  
  // Maximum idle time before considering a connection stale (10 minutes)
  const MAX_IDLE_TIME = 10 * 60 * 1000;
  
  try {
    // Get all presence records
    const presenceRef = db.ref('presence');
    const snapshot = await presenceRef.once('value');
    const presenceData = snapshot.val();
    
    if (!presenceData) {
      console.log('No presence data found');
      return;
    }
    
    // Check each client's last activity time
    const staleClientIds = [];
    
    for (const clientId in presenceData) {
      const clientData = presenceData[clientId];
      
      // If lastActive is a server value, need to convert it
      let lastActiveTime = 0;
      
      if (clientData && clientData.lastActive) {
        // Check if it's a server timestamp object or a direct timestamp
        if (typeof clientData.lastActive === 'object' && clientData.lastActive['.sv']) {
          // This is a server timestamp placeholder, consider it fresh
          continue;
        } else {
          lastActiveTime = clientData.lastActive;
        }
      }
      
      // Check if the client has been inactive too long
      const idleTime = now - lastActiveTime;
      
      if (idleTime > MAX_IDLE_TIME) {
        staleClientIds.push(clientId);
      }
    }
    
    console.log(`Found ${staleClientIds.length} stale connections to remove`);
    
    // Remove stale connections
    const removePromises = staleClientIds.map(clientId => {
      return presenceRef.child(clientId).remove();
    });
    
    await Promise.all(removePromises);
    
    console.log(`Successfully removed ${staleClientIds.length} stale connections`);
  } catch (error) {
    console.error('Error cleaning up connections:', error);
  }
});
*/ 