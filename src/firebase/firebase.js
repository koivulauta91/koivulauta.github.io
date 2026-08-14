import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDudoWaxrveCe5qeznzKoxAMAAyZPhuGw8",
  authDomain: "koivulauta.firebaseapp.com",
  projectId: "koivulauta",
  storageBucket: "koivulauta.firebasestorage.app",
  messagingSenderId: "682612906166",
  appId: "1:682612906166:web:0781c51b60d1fcccb56e17",
  measurementId: "G-VHXZJX7FEX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);