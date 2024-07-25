import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './components/Admin';
import BookList from './components/BookList';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import './styles.css';

const App = () => {
  const [user] = useAuthState(auth);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          // Corrected way to reference the document in a collection
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData.role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
      setLoading(false);
    };

    fetchUserRole();
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
            {userRole === 'admin' && <Link to="/admin">Admin</Link>}
            <button onClick={() => auth.signOut()}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/books" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        {userRole === 'admin' && <Route path="/admin" element={<Admin />} />}
        {user && <Route path="/books" element={<BookList />} />}
        <Route path="/" element={<BookList />} />
      </Routes>
    </Router>
  );
};

export default App;