import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError(
                'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.'
            );
            return;
        }

        try {
            await authService.register(username, email, password);
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            // Display error message
        }
    };

    return (
        <div className="register-form">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div className="input-container">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {passwordError && <div className="error-message">{passwordError}</div>}
                </div>
                <div className="button-container">
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
};

export default Register;