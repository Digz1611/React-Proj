import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';

// User login
const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Find the user document in Firestore based on the email
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            // You can access additional user data here if needed
            console.log("User data:", userData);
        } else {
            console.log("User not found in Firestore");
        }

        return user;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

// New state variable to keep track of the authentication status
let isAuthenticatedValue = false;

// Function to check if the user is authenticated
const isAuthenticated = () => {
    return isAuthenticatedValue;
};

// Function to handle authentication status changes
const handleAuthStateChanged = (user) => {
    isAuthenticatedValue = !!user; // Update the authentication status based on the user object
};

// Subscribe to the authentication state changes
const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);

const authService = {
    login,
    isAuthenticated,
    // Other exports
};

export default authService;