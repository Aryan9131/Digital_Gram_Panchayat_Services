const express = require('express');
const cors = require('cors');
const admin = require("firebase-admin");
const { Firestore } = require('@google-cloud/firestore');
const path = require('path');

//  Initialize Firebase Admin with Service Account
const serviceAccount = require('./config/digital-gram-panchayat-e9bf6-firebase-adminsdk-s4sfs-64fc87c072.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<your-project-id>.firebaseio.com" // Replace with your database URL
});
// Initialize Firestore
const db = admin.firestore(); // Use Firestore from Firebase Admin

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS
const corsOptions = {
  origin: [
    'https://organic-space-parakeet-46p9wpp4wj6hj756-5173.app.github.dev',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ["Authorization", "Content-Type"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Verify Token Endpoint
app.post("/verifyToken", async (req, res) => {
  console.log("***** Request received at /verifyToken *****");
  
  const { token } = req.body;
  if (!token) {
    console.log('-- token not found ! ---')
    return res.status(400).send("Token is required");
  }

  try {
    // Verify the Firebase ID token
    console.log('-- Try Block Running ---')

    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;
    console.log("Decoded Token:", decodedToken);

    // Fetch user data from Firestore
    const userDoc = await db.collection("users").doc(uid).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      return res.json({ message: "Token verified", user: {...userData, _id :uid }});
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).send("Token verification failed");
  }
});

// Start the Server
app.listen(PORT, (error) => {
  if (error) {
    console.error('Error starting server:', error);
  } else {
    console.log("Server running on PORT:", PORT);
  }
});
