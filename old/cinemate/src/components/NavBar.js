import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/NavBar.css';

const NavBar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setIsAuthenticated(authService.isAuthenticated());
        if (location.state && location.state.userData) {
            setUserData(location.state.userData);
        }
    }, [location.state]);

    const handleLogout = () => {
        authService.logout();
        setIsAuthenticated(false);
        setUserData(null);
        navigate('/');
    };

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
                {isAuthenticated && (
                    <li>
                        <Link to={`/profile/${userData.userId}`}>{userData.username}</Link>
                    </li>
                )}
                <li>
                    <Link to={isAuthenticated ? '/profile' : '/login'}>
                        {isAuthenticated ? 'Profile' : 'Login'}
                    </Link>
                </li>
                {!isAuthenticated && (
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                )}
                {isAuthenticated && (
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;