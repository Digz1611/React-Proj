// src/components/RemoveItinerary.js

import React, { useEffect, useState } from 'react';
import { deleteDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './styles/RemoveItinerary.module.css';

const RemoveItinerary = () => {
  const [itinerarys, setItinerarys] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const fetchItinerarys = async () => {
      try {
        if (user) {
          const itinerarysQuery = query(collection(db, 'itinerarys'), where('userEmail', '==', user.email));
          const querySnapshot = await getDocs(itinerarysQuery);
          const itinerarysData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setItinerarys(itinerarysData);
        }
      } catch (error) {
        console.error('Error fetching itinerarys:', error);
      }
    };

    fetchItinerarys();
  }, [user]);

  const handleRemove = async (itineraryId) => {
    try {
      await deleteDoc(doc(db, 'itinerarys', itineraryId));
      setItinerarys(itinerarys.filter(itinerary => itinerary.id !== itineraryId));
    } catch (error) {
      console.error('Error removing itinerary:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.removeItineraryContainer}>
      <h1 className={styles.destination}>Itinerarys</h1>
      <ul className={styles.itineraryList}>
        {itinerarys.map(itinerary => (
          <li key={itinerary.id} className={styles.itineraryItem}>
            <div className={styles.itineraryDetails}>
              <h2 className={styles.itineraryDestination}>{itinerary.destination}</h2>
              <h2 className={styles.itineraryDate}>{itinerary.date}</h2>
            </div>
            <button className={styles.deleteButton} onClick={() => handleRemove(itinerary.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RemoveItinerary;
