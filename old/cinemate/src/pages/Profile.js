// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import ReviewList from './ReviewList';
import MovieSearch from '../components/MovieSearch';
import authService from '../services/authService';
import movieService from '../services/movieService';
import '../styles/Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = authService.isAuthenticated();
                if (currentUser) {
                    const userId = currentUser.uid; // Assuming Firebase Auth returns a user object with a `uid` property
                    const userData = await movieService.getUserData(userId);
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    // Other functions and JSX...
};

export default Profile;