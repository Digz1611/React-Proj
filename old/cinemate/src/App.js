import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import WishList from './pages/WishList';
import ReviewList from './pages/ReviewList';
import EditProfile from './components/EditProfile';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/profile/:userId/edit" element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            } />
            <Route path="/profile/:userId" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path="/wishlist" element={
              <PrivateRoute>
                <WishList />
              </PrivateRoute>
            } />
            <Route path="/reviews" element={
              <PrivateRoute>
                <ReviewList />
              </PrivateRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;