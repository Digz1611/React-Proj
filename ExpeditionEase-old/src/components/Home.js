// src/components/Home.js
import React from 'react';
import { Container } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <h2>Welcome to Travel Itinerary Planner</h2>
      <p><strong>ExpeditionEase</strong> is designed to help you plan and manage your travel itineraries. Create, edit, and share your itineraries with the public or keep them private. You can also save drafts to work on later, ensuring your trips are perfectly planned.</p>
      <p>Designed by Diego Langeveldt.</p>
      <h3>How it works:</h3>
      <ul>
  <li><strong>Register/Login:</strong> Create an account or log in to access all the app features.</li>
  <li><strong>Create Itineraries:</strong> Add new itineraries and choose to keep them private, public, or save them as drafts.</li>
  <li><strong>Edit Itineraries:</strong> Edit your existing itineraries. Only the creator can edit an itinerary.</li>
  <li><strong>Manage Itineraries:</strong> View and manage your private, public, and draft itineraries from their respective sections.</li>
</ul>
    </Container>
  );
};

export default Home;
