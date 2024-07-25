// src/components/ItineraryDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Container, Button } from 'react-bootstrap';

const ItineraryDetail = () => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const firestore = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchItinerary= async () => {
      const itineraryDoc = await getDoc(doc(firestore, 'itinerarys', id));
      if (itineraryDoc.exists()) {
        setItinerary(itineraryDoc.data());
      }
      setLoading(false);
    };

    fetchItinerary();
  }, [id, firestore]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!itinerary) {
    return <p>Itinerarynot found.</p>;
  }

  return (
    <Container>
      <h2>{itinerary.title}</h2>
      <h3>Ingredients:</h3>
      <ul>
        {itinerary.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{itinerary.instructions}</p>
      {user && user.uid === itinerary.createdBy && (
        <div>
          <Link to={`/edit-itinerary/${id}`}>
            <Button variant="primary">Edit Itinerary</Button>
          </Link>
        </div>
      )}
    </Container>
  );
};

export default ItineraryDetail;
