import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, signInAnonymously } from 'firebase/auth';

// Get config from runtime environment
const getFirebaseConfig = () => {
  if (typeof window !== 'undefined' && window.__FIREBASE_CONFIG__) {
    return window.__FIREBASE_CONFIG__;
  }
  return {
    apiKey: '',
    authDomain: '',
    databaseURL: ''
  };
};

const app = initializeApp(getFirebaseConfig());
const auth = getAuth(app);
const db = getDatabase(app);

// Sign in anonymously when the app starts
signInAnonymously(auth)
  .then(() => {
    console.log('Signed in anonymously');
  })
  .catch((error) => {
    console.error('Error signing in:', error);
  });

export { db, auth }; 