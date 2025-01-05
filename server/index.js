const express = require('express');
const cors = require('cors');
const admin = require("firebase-admin");
const { Firestore } = require('@google-cloud/firestore');
const path = require('path');
const dotenv =require('dotenv');
dotenv.config();
//  Initialize Firebase Admin with Service Account

// Initialize Firebase Admin SDK with environment variables
admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Handle line breaks
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSAL_DOMAIN
  }),
});
// Initialize Firestore
const db = admin.firestore(); // Use Firestore from Firebase Admin

const app = express();
const PORT = 8000;

// Enable CORS
const corsOptions = {
  origin: [
    'https://digital-gram-panchayat-services-frontend.vercel.app',
    'http://localhost:5174'
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
  const { token } = req.body;
  console.log("***** Request received at /verifyToken ---> "+token );
  
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
      console.log('user is : '+JSON.stringify(userData));
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