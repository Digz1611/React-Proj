// src/components/DraftItinerarys.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Container, Button } from 'react-bootstrap';

const DraftItinerarys = () => {
  const [itinerarys, setItinerarys] = useState([]);
  const [error, setError] = useState(null);
  const firestore = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchDraftItinerarys = async () => {
      if (user) {
        try {
          const q = query(collection(firestore, 'itinerarys'), where('createdBy', '==', user.uid), where('status', '==', 'draft'));
          const querySnapshot = await getDocs(q);
          const fetchedItinerarys = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setItinerarys(fetchedItinerarys);
        } catch (error) {
          setError('Failed to fetch draft itinerarys');
        }
      }
    };

    fetchDraftItinerarys();
  }, [user, firestore]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'itinerarys', id));
      setItinerarys(itinerarys.filter(itinerary=> itinerary.id !== id));
    } catch (error) {
      setError('Failed to delete itinerary');
    }
  };

  return (
    <Container>
      <h2>Your Draft Itinerarys</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {itinerarys.length === 0 ? (
        <p>No draft itinerarys found.</p>
      ) : (
        <ul>
          {itinerarys.map((itinerary) => (
            <li key={itinerary.id}>
              <Link to={`/edit-itinerary/${itinerary.id}`}>{itinerary.title}</Link>
              <Button variant="danger" onClick={() => handleDelete(itinerary.id)}>Delete</Button>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default DraftItinerarys;
