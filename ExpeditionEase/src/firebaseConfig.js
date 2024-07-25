// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyBxAl3hH6UB88Ribq5Di35ZilF8ZjKJclg",
  authDomain: "expeditionease-d59c8.firebaseapp.com",
  projectId: "expeditionease-d59c8",
  storageBucket: "expeditionease-d59c8.appspot.com",
  messagingSenderId: "107453419378",
  appId: "1:107453419378:web:0a73838e2a9dd46bb357eb",
  measurementId: "G-53N4W76PVW"
};

const app = initializeApp(firebaseConfig);
console.log(app);
const auth = getAuth(app);
console.log(auth)
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