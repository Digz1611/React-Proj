// src/components/ItineraryList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Container, Button } from 'react-bootstrap';

const ItineraryList = ({ type }) => {
  const [itinerarys, setItinerarys] = useState([]);
  const [error, setError] = useState(null);
  const firestore = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchItinerarys = async () => {
      const user = auth.currentUser;
      let q;
      if (type === 'public') {
        q = query(collection(firestore, 'itinerarys'), where('status', '==', 'public'));
      } else if (type === 'private' && user) {
        q = query(collection(firestore, 'itinerarys'), where('createdBy', '==', user.uid), where('status', '==', 'private'));
      } else if (type === 'draft' && user) {
        q = query(collection(firestore, 'itinerarys'), where('createdBy', '==', user.uid), where('status', '==', 'draft'));
      } else {
        return;
      }

      const querySnapshot = await getDocs(q);
      const fetchedItinerarys = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItinerarys(fetchedItinerarys);
    };

    fetchItinerarys();
  }, [type, firestore, auth]);

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
      <h2>{type.charAt(0).toUpperCase() + type.slice(1)} Itinerarys</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {itinerarys.length === 0 ? (
        <p>No {type} itinerarys found.</p>
      ) : (
        <ul>
          {itinerarys.map((itinerary) => (
            <li key={itinerary.id}>
              <Link to={`/itinerarys/${itinerary.id}`}>{itinerary.title}</Link>
              {itinerary.createdBy === auth.currentUser?.uid && (
                <Button variant="danger" onClick={() => handleDelete(itinerary.id)}>Delete</Button>
              )}
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default ItineraryList;
