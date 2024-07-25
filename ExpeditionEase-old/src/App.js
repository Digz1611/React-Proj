import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ItineraryList from './components/ItineraryList';
import ItineraryForm from './components/ItineraryForm';
import ItineraryDetail from './components/ItineraryDetail';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import PrivateItinerarys from './components/PrivateItinerary';
import DraftItinerarys from './components/DraftItinerary';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import './App.css';
import { AuthProvider } from './AuthContext'; // Add this import

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Container className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/itinerarys" element={<PrivateRoute><ItineraryList type="public" /></PrivateRoute>} />
            <Route path="/itinerarys/:id" element={<PrivateRoute><ItineraryDetail /></PrivateRoute>} />
            <Route path="/add-itinerary" element={<PrivateRoute><ItineraryForm /></PrivateRoute>} />
            <Route path="/edit-itinerary/:id" element={<PrivateRoute><ItineraryForm /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/private-itinerarys" element={<PrivateRoute><PrivateItinerarys /></PrivateRoute>} />
            <Route path="/draft-itinerarys" element={<PrivateRoute><DraftItinerarys /></PrivateRoute>} />
          </Routes>
        </Container>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
