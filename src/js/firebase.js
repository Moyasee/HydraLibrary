import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, update } from 'firebase/database';

const firebaseConfig = __FIREBASE_CONFIG__;

try {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  console.log('Firebase initialized successfully');
  export { db, ref, get, update };
} catch (error) {
  console.error('Firebase initialization error:', error);
  // Provide a mock db object
  const mockDb = {
    ref: () => ({}),
    get: async () => ({ val: () => null }),
    update: async () => {}
  };
  export { mockDb as db, ref, get, update };
} 