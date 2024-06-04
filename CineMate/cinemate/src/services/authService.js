import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useMatch, useNavigate } from 'react-router-dom';

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
    login,
    isAuthenticated,
    // Other exports
};

export default authService;