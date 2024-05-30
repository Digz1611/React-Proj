// src/services/authService.js
import { auth } from '../firebase';

const login = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        // User is authenticated, you can store the user information or token as needed
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

const logout = async () => {
    try {
        await auth.signOut();
        // User is signed out, you can clear any stored user information or token
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

const isAuthenticated = () => {
    // Check if the user is authenticated (e.g., check for a token or user object)
    return !!auth.currentUser;
};

const authService = {
    login,
    logout,
    isAuthenticated,
};

export default authService;