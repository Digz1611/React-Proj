// src/components/AddBook.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth, storage } from '../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import './styles/AddBook.module.css'; 

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [bookPhoto, setBookPhoto] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        let photoURL = null; // Initialize photoURL to null

        if (bookPhoto) {
          const storageRef = ref(storage, `book-photos/${bookPhoto.name}`);
          const uploadTask = uploadBytesResumable(storageRef, bookPhoto);

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

        await addDoc(collection(db, 'books'), {
          title,
          author,
          description,
          userId: user.uid,
          userEmail: user.email,
          photoURL, // Use the updated photoURL value
        });

        setTitle('');
        setAuthor('');
        setDescription('');
        setBookPhoto(null);
        setUploadProgress(0);
      } else {
        console.error("User not authenticated");
      }
    } catch (error) {
      console.error("Error adding book: ", error);
    }
  };

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="file"
          onChange={(e) => setBookPhoto(e.target.files[0])}
        />
        {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
