import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Container, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const PrivateItinerarys = () => {
  const [itinerarys, setItinerarys] = useState([]);
  const firestore = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchPrivateItinerarys = async () => {
      if (user) {
        const q = query(collection(firestore, 'itinerarys'), where('createdBy', '==', user.uid), where('status', '==', 'private'));
        const querySnapshot = await getDocs(q);
        const fetchedItinerarys = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItinerarys(fetchedItinerarys);
      }
    };

    fetchPrivateItinerarys();
  }, [user, firestore]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://us-central1-expeditionease-95ada.cloudfunctions.net/api/itinerary/${id}`);
      setItinerarys(itinerarys.filter(itinerary=> itinerary.id !== id));
    } catch (error) {
      console.error('Error deleting itinerary:', error);
    }
  };

  const handleChangeStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(firestore, 'itinerarys', id), { status: newStatus });
      setItinerarys(itinerarys.map(itinerary=> itinerary.id === id ? { ...itinerary, status: newStatus } : itinerary));
    } catch (error) {
      console.error('Error updating itinerarystatus:', error);
    }
  };

  return (
    <Container>
      <h2>Your Private Itinerarys</h2>
      {itinerarys.length === 0 ? (
        <p>No private itinerarys found.</p>
      ) : (
        <ul>
          {itinerarys.map((itinerary) => (
            <li key={itinerary.id}>
              <Link to={`/edit-itinerary/${itinerary.id}`}>{itinerary.title}</Link>
              <Button variant="danger" onClick={() => handleDelete(itinerary.id)}>Delete</Button>
              <Form.Select 
                value={itinerary.status} 
                onChange={(e) => handleChangeStatus(itinerary.id, e.target.value)}
              >
                <option value="private">Private</option>
                <option value="public">Public</option>
              </Form.Select>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default PrivateItinerarys;
