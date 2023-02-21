import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'test-1126e.firebaseapp.com',
  projectId: 'test-1126e',
  storageBucket: 'test-1126e.appspot.com',
  messagingSenderId: '865335463149',
  appId: '1:865335463149:web:6b3241d421ee075a5710e4',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
