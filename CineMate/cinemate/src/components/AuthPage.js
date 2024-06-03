import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import '../styles/Auth.css';

const AuthPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (isRegister) {
                await authService.register(username, email, password);
                // Redirect or perform any additional actions after successful registration
            } else {
                const isLoggedIn = await authService.login(email, password);
                if (!isLoggedIn) {
                    setError('Invalid email or password');
                } else {
                    // Redirect or perform any additional actions after successful login
                }
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'username') {
            setUsername(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    return (
        <div>
            {error && <p>Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            required={isRegister}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : isRegister ? 'Register' : 'Login'}
                </button>
            </form>
            <p>
                {isRegister
                    ? 'Already have an account? '
                    : 'Don\'t have an account? '}
                <button type="button" onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? 'Login' : 'Register'}
                </button>
            </p>
        </div>
    );
};

export default AuthPage;