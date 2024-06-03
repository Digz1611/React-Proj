import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await authService.login(email, password);
            // Redirect to home page or perform other actions
        } catch (error) {
            setErrorMessage('Invalid email or password');
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="button" onClick={toggleShowPassword}>
                        {showPassword ? 'Hide Password' : 'Show Password'}
                    </button>
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="button-container">
                    <button type="submit">Login</button>
                </div>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
};

export default Login;