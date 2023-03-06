import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "bunyang-moa.firebaseapp.com",
  projectId: "bunyang-moa",
  storageBucket: "bunyang-moa.appspot.com",
  messagingSenderId: "305625265692",
  appId: "1:305625265692:web:502db45f3bbfc908c111d9",
  measurementId: "G-KX4ED9Q5EQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
