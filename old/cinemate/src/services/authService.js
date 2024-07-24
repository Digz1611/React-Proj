import { deleteUser, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from '../firebase';

const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            const userDocId = userDoc.id;

            return { user, userDocId, userData };
        } else {
            console.log("User not found in Firestore");
            return { user, userDocId: null, userData: null };
        }
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

const logout = () => {
    auth.signOut();
};

const deleteUserAccount = async (user) => {
    try {
        await deleteUser(user);
        console.log("User deleted successfully");
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};

let isAuthenticatedValue = false;

const isAuthenticated = () => {
    return isAuthenticatedValue;
};

const handleAuthStateChanged = (user) => {
    isAuthenticatedValue = !!user;
};

onAuthStateChanged(auth, handleAuthStateChanged);

const authService = {
    login,
    logout,
    isAuthenticated,
    deleteUserAccount,
};

export default authService;