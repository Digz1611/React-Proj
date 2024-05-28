import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import authService from '../services/authService';

const PrivateRoute = ({ children }) => (
    <Route
        element={authService.isAuthenticated() ? (
            children
        ) : (
            <Navigate to="/login" replace />
        )}
    />
);

export default PrivateRoute;