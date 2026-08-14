import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config reads from Vite environment variables (VITE_FIREBASE_*) with safe fallbacks.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDudoWaxrveCe5qeznzKoxAMAAyZPhuGw8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "koivulauta.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "koivulauta",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "koivulauta.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "682612906166",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:682612906166:web:0781c51b60d1fcccb56e17",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-VHXZJX7FEX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);