import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './styles/Itinerarylist.module.css'; 

const ItineraryList = () => {
  const [itinerarys, setItinerarys] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const fetchItinerarys = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'itinerarys'));
          const itinerarysData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setItinerarys(itinerarysData);
        } catch (error) {
          console.error("Error fetching itinerarys: ", error);
        }
      };
      fetchItinerarys();
    }
  }, [user]);

  if (loading) return <div className={styles['itinerary-list-container']}>Loading...</div>;
  if (error) return <div className={styles['itinerary-list-container']}>Error: {error.message}</div>;

  return (
    <div className={styles['itinerary-list-container']}>
      <h1 className={styles['itinerary-list-header']}>Itinerary List</h1>
      <ul className={styles['itinerary-list']}>
        {itinerarys.map(itinerary => (
          <li className={styles['itinerary-item']} key={itinerary.id}>
            <div className={styles['itinerary-details']}>
              <h2 className={styles['itinerary-destination']}>{itinerary.destination}</h2>
              <h2 className={styles['itinerary-date']}>{itinerary.date}</h2>
              <h3 className={styles['itinerary-date']}>{itinerary.attractions}</h3>
              <h3 className={styles['itinerary-date']}>{itinerary.Accommodation}</h3>
              <button className={styles['viewButton']} onClick={() => alert(JSON.stringify(itinerary, null, 2))}>View Details</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItineraryList;
