import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import '../styles/Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // Password validation
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (!passwordRegex.test(password)) {
                setPasswordError(
                    'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.'
                );
                return;
            }
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store the user's username, email, and password in Firestore
            const userCollection = collection(db, "users");

            await addDoc(userCollection, {
                username: username,
                email: email,
                password: password
            });
            navigate("/login"); // Absolute path (correct)
            console.log("User saved successfully");
            // Other code for successful registration
        } catch (error) {
            // Handle registration error
            console.error('Registration error:', error);
            throw error;
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
