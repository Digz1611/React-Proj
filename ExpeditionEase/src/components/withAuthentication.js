import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

const withAuthentication = (Component) => {
  return (props) => {
    const [user, loading, error] = useAuthState(auth);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return user ? <Component {...props} /> : <Navigate to="/login" />;
  };
};

export default withAuthentication;
