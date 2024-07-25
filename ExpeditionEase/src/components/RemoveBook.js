// src/components/RemoveBook.js

import React, { useEffect, useState } from 'react';
import { deleteDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './styles/RemoveBook.module.css';

const RemoveBook = () => {
  const [books, setBooks] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (user) {
          const booksQuery = query(collection(db, 'books'), where('userEmail', '==', user.email));
          const querySnapshot = await getDocs(booksQuery);
          const booksData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setBooks(booksData);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [user]);

  const handleRemove = async (bookId) => {
    try {
      await deleteDoc(doc(db, 'books', bookId));
      setBooks(books.filter(book => book.id !== bookId));
    } catch (error) {
      console.error('Error removing book:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.removeBookContainer}>
      <h1 className={styles.title}>Books</h1>
      <ul className={styles.bookList}>
        {books.map(book => (
          <li key={book.id} className={styles.bookItem}>
            {book.photoURL && <img src={book.photoURL} alt={book.title} className={styles.bookImage} width="100" height="150" />} {/* Set fixed dimensions for the image */}
            <div className={styles.bookDetails}>
              <h2 className={styles.bookTitle}>{book.title}</h2>
              <h2 className={styles.bookAuthor}>{book.author}</h2>
            </div>
            <button className={styles.deleteButton} onClick={() => handleRemove(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RemoveBook;
