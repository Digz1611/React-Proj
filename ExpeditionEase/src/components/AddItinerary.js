// src/components/AddItinerary.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth, storage } from '../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import './styles/AddItinerary.module.css';

const AddItinerary = () => {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [attractions, setAttractions] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [itineraryPhoto, setItineraryPhoto] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        let photoURL = null; // Initialize photoURL to null

        if (itineraryPhoto) {
          const storageRef = ref(storage, `itinerary-photos/${itineraryPhoto.name}`);
          const uploadTask = uploadBytesResumable(storageRef, itineraryPhoto);

          await new Promise((resolve, reject) => {
            uploadTask.on(
              'state_changed',
              (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setUploadProgress(progress);
              },
              (error) => {
                console.error('Error uploading photo:', error);
                reject(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  photoURL = downloadURL; // Update photoURL with the download URL
                  resolve();
                }).catch(reject);
              }
            );
          });
        }

        await addDoc(collection(db, 'itinerarys'), {
          destination,
          date,
          attractions,
          accommodation,
          userId: user.uid,
          userEmail: user.email,
          photoURL, // Use the updated photoURL value
        });

        setDestination('');
        setDate('');
        setAttractions('');
        setAccommodation('');
        setItineraryPhoto(null);
        setUploadProgress(0);
      } else {
        console.error("User not authenticated");
      }
    } catch (error) {
      console.error("Error adding itinerary: ", error);
    }
  };

  return (
    <div>
      <h2>Add Itinerary</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination"
          required
        />
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date"
          required
        />
        <textarea
          value={attractions}
          onChange={(e) => setAttractions(e.target.value)}
          placeholder="Attractions"
          required
        />
        <textarea
          value={accommodation}
          onChange={(e) => setAccommodation(e.target.value)}
          placeholder="Accommodation"
          required
        />
        <input
          type="file"
          onChange={(e) => setItineraryPhoto(e.target.files[0])}
        />
        {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
        <button type="submit">Add Itinerary</button>
      </form>
    </div>
  );
};

export default AddItinerary;
