// src/services/movieService.js
import { firestore } from '../firebase';

const addUser = async (user) => {
    try {
        const userRef = await firestore.collection('users').add(user);
        return userRef.id;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

const getUserData = async (userId) => {
    try {
        const userDoc = await firestore.collection('users').doc(userId).get();
        return userDoc.data();
    } catch (error) {
        console.error('Error getting user data:', error);
        throw error;
    }
};

const movieService = {
    // other functions...
    addUser,
    getUserData,
};

export default movieService;