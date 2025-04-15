# Firebase Connection Management System

This document provides instructions for implementing and configuring the Firebase connection management system to avoid hitting the 100 simultaneous connection limit in the Realtime Database.

## Overview

The system consists of three main components:

1. **Client-side connection manager** - Manages individual user connections with automatic timeout
2. **Database security rules** - Configures auto-cleanup of stale connections
3. **Server-side cleanup function** - Periodically removes inactive connections

## Implementation Steps

### 1. Client-Side Connection Manager

The `firebase-connection.js` file provides a connection management system that:

- Tracks user activity and presence
- Automatically disconnects idle users after a configurable timeout
- Manages reconnections when users return to the site
- Uses a shared connection pool efficiently

**How to implement:**

1. Include the connection manager in your project:
   ```js
   import connectionManager from './firebase-connection.js';
   ```

2. Initialize the connection manager when your app loads:
   ```js
   document.addEventListener('DOMContentLoaded', async () => {
       await connectionManager.initialize();
   });
   ```

3. The manager automatically handles:
   - Connection tracking
   - Disconnection on page unload
   - Disconnection after inactivity 
   - Reconnection when user returns

### 2. Database Security Rules

The `database.rules.json` file contains security rules that:

- Allow reading source data by anyone
- Allow writing to source statistics
- Configure auto-cleanup of stale presence data

**How to implement:**

1. In the Firebase Console:
   - Go to Realtime Database > Rules
   - Replace existing rules with the contents of `database.rules.json`
   - Publish the rules

2. Alternatively, deploy rules using the Firebase CLI:
   ```bash
   firebase deploy --only database
   ```

### 3. Server-Side Cleanup Function

For more robust management, implement a server-side cleanup function that periodically removes inactive connections:

**Option A: Firebase Cloud Functions (Recommended)**

1. Set up Firebase Cloud Functions:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init functions
   ```

2. Implement the cleanup function in `functions/index.js` using the code in `connection-cleanup.js`

3. Deploy the function:
   ```bash
   firebase deploy --only functions
   ```

**Option B: External Scheduled Job**

If you prefer to use an external server:

1. Set up a Node.js server with `firebase-admin` and `node-cron`
2. Implement the cleanup script using the provided example code
3. Schedule it to run periodically (every 5-10 minutes)

## Configuration Options

You can modify these parameters in `firebase-connection.js`:

- `CONNECTION_TIMEOUT`: Time before auto-disconnecting idle users (default: 5 minutes)
- `CONNECTION_HEARTBEAT_INTERVAL`: Frequency of heartbeat updates (default: 3 minutes)

## Monitoring

1. Monitor connection counts in Firebase Console:
   - Go to Realtime Database > Usage
   - View active connections graph

2. Add logging to track disconnections:
   ```js
   // In your main.js or app.js
   connectionManager.onDisconnect = () => {
     console.log('Disconnected from Firebase due to inactivity');
   };
   ```

## Additional Recommendations

1. **Implement request batching**: Combine multiple database operations into single requests
2. **Use local caching**: Store frequently accessed data in localStorage
3. **Lazy loading**: Only connect to Firebase when needed
4. **Consider Firebase plan upgrade**: If your usage consistently exceeds limits

## Troubleshooting

- **High connection counts**: Check for zombie connections in the Firebase console
- **Performance issues**: Ensure your app properly disconnects when backgrounded
- **Lost data**: Implement offline persistence for critical operations

## Best Practices

1. Never keep connections open unnecessarily
2. Always disconnect when the app goes to background
3. Implement exponential backoff for reconnection attempts
4. Monitor connection counts regularly
5. Use the presence system to track active users 