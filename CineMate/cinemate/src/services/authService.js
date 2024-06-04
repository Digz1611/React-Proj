import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { app, db, auth } from './firebase';

// Register a new user
const register = async (username, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store the user's username, email, and password in Firestore
        await db.collection('users').doc(user.uid).set({
            username,
            email,
            password,
        });

        // Other code for successful registration
    } catch (error) {
        // Handle registration error
        console.error('Registration error:', error);
        throw error;
    }
};

// User login
const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // User is authenticated, return true
        return true;
    } catch (error) {
        console.error('Login failed:', error);
        // Login failed, return false
        return false;
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
    register,
    login,
    isAuthenticated,
    // Other exports
};

export default authService;