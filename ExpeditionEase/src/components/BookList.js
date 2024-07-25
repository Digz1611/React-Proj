import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './styles/Booklist.module.css'; 

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const fetchBooks = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'books'));
          const booksData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setBooks(booksData);
        } catch (error) {
          console.error("Error fetching books: ", error);
        }
      };
      fetchBooks();
    }
  }, [user]);

  if (loading) return <div className={styles['book-list-container']}>Loading...</div>;
  if (error) return <div className={styles['book-list-container']}>Error: {error.message}</div>;

  return (
    <div className={styles['book-list-container']}>
      <h1 className={styles['book-list-header']}>Book List</h1>
      <ul className={styles['book-list']}>
        {books.map(book => (
          <li className={styles['book-item']} key={book.id}>
            {book.photoURL && <img src={book.photoURL} alt={book.title} className={styles['book-image']} />}
            <div className={styles['book-details']}>
              <h2 className={styles['book-title']}>{book.title}</h2>
              <h2 className={styles['book-author']}>{book.author}</h2>
              <h3 className={styles['book-author']}>{book.description}</h3>
              <button className={styles['viewButton']} onClick={() => alert(JSON.stringify(book, null, 2))}>View Details</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
