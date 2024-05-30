// src/components/Login.js
import React, { useState } from 'react';
import authService from '../services/authService';
import movieService from '../services/movieService';
import '../styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await authService.login(email, password);
            // Store user data in Firestore
            const userId = await movieService.addUser({ email });
            // Store the userId or do any necessary operations
            console.log('User ID:', userId);
        } catch (error) {
            console.error('Login failed:', error);
            // Show error message
        }
    };

    // Render login form...
};

export default Login;