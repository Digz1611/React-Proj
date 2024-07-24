// src/services/movieService.js
import axios from 'axios';
import { db as firestore } from '../firebase';

const OMDB_API_KEY = 'YOUR_OMDB_API_KEY';
const OMDB_API_URL = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

const searchMovies = async (query) => {
    try {
        const response = await axios.get(OMDB_API_URL, {
            params: {
                s: query,
            },
        });
        return response.data.Search || [];
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};

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
    searchMovies,
    addUser,
    getUserData,
};

export default movieService;
