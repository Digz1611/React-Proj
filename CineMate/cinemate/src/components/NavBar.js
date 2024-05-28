import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';

const NavBar = () => {
    const isAuthenticated = authService.isAuthenticated();

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {isAuthenticated && (
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                )}
                {isAuthenticated ? (
                    <li>
                        <button onClick={authService.logout}>Logout</button>
                    </li>
                ) : (
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;