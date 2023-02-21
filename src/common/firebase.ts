import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'st-practice-975cb.firebaseapp.com',
  projectId: 'st-practice-975cb',
  storageBucket: 'st-practice-975cb.appspot.com',
  messagingSenderId: '708217413194',
  appId: '1:708217413194:web:52628d7b98e22a1e44d0b3',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
