// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA11v89h7kSUdpx5YNZdu6Pc5tmGoLvLwY",
  authDomain: "expeditionease-95ada.firebaseapp.com",
  projectId: "expeditionease-95ada",
  storageBucket: "expeditionease-95ada.appspot.com",
  messagingSenderId: "725862846811",
  appId: "1:725862846811:web:3ee8a9b80642bc9eaf8a7e",
  measurementId: "G-E341QJTYMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };



// // Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";

// // Initialize Firebase
// const analytics = getAnalytics(app);
