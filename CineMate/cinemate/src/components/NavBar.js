import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/NavBar.css';

const NavBar = () => {
    const isAuthenticated = authService.isAuthenticated();

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">MovieMate</Link>
            </div>
            <ul className="navbar-nav">
                {isAuthenticated && (
                    <>
                        <li>
                            <Link to="/wishlist">Wish List</Link>
                        </li>
                        <li>
                            <Link to="/reviews">Reviews</Link>
                        </li>
                        <li>
                            <Link to="/movies">Search Movies</Link>
                        </li>
                    </>
                )}
                <li>
                    <Link to="/auth">{isAuthenticated ? 'Profile' : 'Login/Register'}</Link>
                </li>
                {isAuthenticated && (
                    <li>
                        <button onClick={authService.logout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;