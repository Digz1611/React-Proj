// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Register from './components/Register';
// import Planner from './components/Planner';
// import ItineraryList from './components/ItineraryList';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth, db } from './firebaseConfig';
// import { doc, getDoc } from 'firebase/firestore';
// import './styles.css';

// const App = () => {
//   const [user] = useAuthState(auth);
//   const [userRole, setUserRole] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       if (user) {
//         try {
//           // Corrected way to reference the document in a collection
//           const userDocRef = doc(db, 'users', user.uid);
//           const userDoc = await getDoc(userDocRef);
//           if (userDoc.exists()) {
//             const userData = userDoc.data();
//             setUserRole(userData.role);
//           }
//         } catch (error) {
//           console.error("Error fetching user role:", error);
//         }
//       }
//       setLoading(false);
//     };

//     fetchUserRole();
//   }, [user]);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <Router>
//       <nav>
//         <Link to="/">Home</Link>
//         {user ? (
//           <>
//             {userRole === 'planner' && <Link to="/planner">Planner</Link>}
//             <button onClick={() => auth.signOut()}>Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login">Login</Link>
//             <Link to="/register">Register</Link>
//           </>
//         )}
//       </nav>
//       <Routes>
//         <Route path="/login" element={user ? <Navigate to="/itinerarys" /> : <Login />} />
//         <Route path="/register" element={<Register />} />
//         {userRole === 'planner' && <Route path="/planner" element={<Planner />} />}
//         {user && <Route path="/itinerarys" element={<ItineraryList />} />}
//         <Route path="/" element={<ItineraryList />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;




import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Planner from './components/Planner';
import ItineraryList from './components/ItineraryList';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import './styles.css';

const App = () => {
  const [user] = useAuthState(auth);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          // Corrected way to reference the document in a collection
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData.role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
      setLoading(false);
    };

    fetchUserRole();
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
<Router>
<nav style={{ backgroundColor: '#282828' }}>


    <button>
      <Link to="/">Home</Link>
    </button>
    {user ? (
      <>
        {userRole === 'planner' && (
          <button>
            <Link to="/planner">Planner</Link>
          </button>
        )}
        <button onClick={() => auth.signOut()}>Logout</button>
      </>
    ) : (
      <>
        <button>
          <Link to="/login">Login</Link>
        </button>
        <button>
          <Link to="/register">Register</Link>
        </button>
      </>
    )}
  </nav>
  <Routes>
    <Route path="/login" element={user ? <Navigate to="/itinerarys" /> : <Login />} />
    <Route path="/register" element={<Register />} />
    {userRole === 'planner' && <Route path="/planner" element={<Planner />} />}
    {user && <Route path="/itinerarys" element={<ItineraryList />} />}
    <Route path="/" element={<ItineraryList />} />
  </Routes>
</Router>
  );
};

export default App;