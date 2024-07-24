const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

// Initialize the app with a service account, granting admin privileges
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://expeditionease-95ada.firebaseio.com' // Update with your database URL
});

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://expeditionease-95ada.web.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204
};

// Use CORS middleware
app.use(cors(corsOptions));
app.use(express.json()); // For parsing application/json

// Basic test route to verify CORS setup
app.get('/', (req, res) => {
  res.send('CORS setup successful');
});

// deleteItineraryendpoint
app.delete('/itinerary/:id', async (req, res) => {
  const { id } = req.params;
  const firestore = admin.firestore();

  try {
    await firestore.collection('itinerarys').doc(id).delete();
    res.status(200).send('Itinerarydeleted successfully');
  } catch (error) {
    console.error('Error deleting itinerary:', error);
    res.status(400).send('Error deleting itinerary: ' + error.message);
  }
});

// deleteUser endpoint
app.delete('/user/:id', async (req, res) => {
  const { id } = req.params;
  const firestore = admin.firestore();

  try {
    await admin.auth().deleteUser(id);
    await firestore.collection('users').doc(id).delete();
    res.status(200).send('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(400).send('Error deleting user: ' + error.message);
  }
});

// Export the API to Firebase Cloud Functions
exports.api = functions.https.onRequest(app);
