import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAJWUM70gB7SdppFMHwCzy1jFDQMMdjVJc",
    authDomain: "cinemate-4d8fe.firebaseapp.com",
    projectId: "cinemate-4d8fe",
    storageBucket: "cinemate-4d8fe.appspot.com",
    messagingSenderId: "313651780913",
    appId: "1:313651780913:web:05cb0e62359e587cd22410",
    measurementId: "G-8GL4RCGYK3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };