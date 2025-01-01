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

// Initialize auth state
const initializeAuth = async () => {
  try {
    await signInAnonymously(auth);
    console.log('Signed in anonymously');
  } catch (error) {
    console.error('Error signing in:', error);
    // Retry after 1 second if config wasn't loaded yet
    if (error.code === 'auth/invalid-api-key') {
      setTimeout(initializeAuth, 1000);
    }
  }
};

initializeAuth();

export { db, auth }; 