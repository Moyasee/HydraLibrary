import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, signInAnonymously } from 'firebase/auth';

// Wait for config to be available
const waitForConfig = () => {
  return new Promise((resolve) => {
    const check = () => {
      if (window.__FIREBASE_CONFIG__) {
        resolve(window.__FIREBASE_CONFIG__);
      } else {
        setTimeout(check, 100);
      }
    };
    check();
  });
};

// Initialize Firebase
const initializeFirebase = async () => {
  const config = await waitForConfig();
  const app = initializeApp(config);
  const auth = getAuth(app);
  const db = getDatabase(app);

  try {
    await signInAnonymously(auth);
    console.log('Signed in anonymously');
  } catch (error) {
    console.error('Error signing in:', error);
  }

  return { auth, db };
};

// Export a promise that resolves with Firebase instances
export default initializeFirebase(); 