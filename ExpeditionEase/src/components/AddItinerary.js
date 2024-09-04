// src/components/AddItinerary.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import './styles/AddItinerary.module.css';

const AddItinerary = () => {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [attractions, setAttractions] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [transportation, setTransportation] = useState('');
  const [cost, setCost] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, 'itinerarys'), {
          destination,
          date,
          attractions,
          accommodation,
          transportation,
          cost,
          userId: user.uid,
          userEmail: user.email,
        });

        // Reset form fields
        setDestination('');
        setDate('');
        setAttractions('');
        setAccommodation('');
        setTransportation('');
        setCost('');
      } else {
        console.error("User not authenticated");
      }
    } catch (error) {
      console.error("Error adding itinerary: ", error);
    }
  };

  return (
    <div>
      <h2>Add Itinerary:</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <h3>Destination:</h3>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Give the Destination however you so please..."
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h3>Date:</h3>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Give the Date however you so please..."
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h3>Attractions:</h3>
          <textarea
            value={attractions}
            onChange={(e) => setAttractions(e.target.value)}
            placeholder="Detail the places you plan to visit and what you want to experience or see..."
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h3>Accommodation:</h3>
          <textarea
            value={accommodation}
            onChange={(e) => setAccommodation(e.target.value)}
            placeholder="Provide a list of places you'd like to stay, along with links to them..."
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Transportation:</h3>
          <input
            type="text"
            value={transportation}
            onChange={(e) => setTransportation(e.target.value)}
            placeholder="Give all means of Transportation that would be used..."
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Cost:</h3>
          <input
            type="text"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="Give the est Cost to make the trip happen..."
            required
          />
        </div>

        <button type="submit">Add Itinerary</button>
      </form>
    </div>
  );
};

export default AddItinerary;
