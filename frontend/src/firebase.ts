import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD-wDyzvuEXLcOuEC3LvPvKASR6C5iwcz8",
  authDomain: "unilink-ffb98.firebaseapp.com",
  projectId: "unilink-ffb98",
  storageBucket: "unilink-ffb98.firebasestorage.app",
  messagingSenderId: "122824338280",
  appId: "1:122824338280:web:ac348afc3484f769a844dd",
  measurementId: "G-1P5H3ZG87R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);

export default app;

//This file connects your frontend React app to Firebase.

