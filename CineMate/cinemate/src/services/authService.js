import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    // Your Firebase configuration
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const register = async (username, email, password) => {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Store the user's username, email, and password in Firestore
        await firebase.firestore().collection('users').doc(user.uid).set({
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

const login = async (email, password) => {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        // User is authenticated, return true
        return true;
    } catch (error) {
        console.error('Login failed:', error);
        // Login failed, return false
        return false;
    }
};

// Other functions

const authService = {
    register,
    login,
    // Other exports
};

export default authService;