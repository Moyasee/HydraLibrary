import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBGhsPwkivWm12IR4fSdaq7lMEDUC_684w",
    authDomain: "hydra-library.firebaseapp.com",
    databaseURL: "https://hydra-library-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "hydra-library",
    storageBucket: "hydra-library.firebasestorage.app",
    messagingSenderId: "69258279608",
    appId: "1:69258279608:web:7888e9b4d2e05f4ced524d"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db }; 