// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyBOUZWfs5defLbF0vdNt91von5Vg5LAuGs",
  authDomain: "fir-app-ef2b9.firebaseapp.com",
  projectId: "fir-app-ef2b9",
  storageBucket: "fir-app-ef2b9.appspot.com",
  messagingSenderId: "781861443847",
  appId: "1:781861443847:web:7e8524d598fc396eb7cda2",
  measurementId: "G-637T9L3BRQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const fetchUserRole = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.role;
    } else {
      console.log("User document not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
};

export { auth, db, fetchUserRole, storage };