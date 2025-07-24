'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBVJAymK3nTZdermiGKYwzaiS-1mbsOvS4",
  authDomain: "quiz-master-f18b9.firebaseapp.com",
  projectId: "quiz-master-f18b9",
  storageBucket: "quiz-master-f18b9.firebasestorage.app",
  messagingSenderId: "844078248129",
  appId: "1:844078248129:web:f9a5ebcfd26b446a1fa440",
  measurementId: "G-EB8J64T4EV"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
