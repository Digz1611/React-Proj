import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Register.module.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('viewer'); // Default role is viewer
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), { role }); // Store the user's role in Firestore
      navigate('/itinerarys');
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  };

  return (
    <div className={styles['register-container']}>
      <h2 className={styles['register-header']}>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className={styles.input}
        />
        <div className={styles['radio-group']}>
          <label>
            <input
              type="radio"
              value="viewer"
              checked={role === 'viewer'}
              onChange={(e) => setRole(e.target.value)}
            />
            Viewer - Can view and search for itinerarys
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="planner"
              checked={role === 'planner'}
              onChange={(e) => setRole(e.target.value)}
            />
            Planner - Can add, edit, and remove itinerarys
          </label>
        </div>
        <button type="submit" className={styles.button}>Register</button>
      </form>
    </div>
  );
};

export default Register;
