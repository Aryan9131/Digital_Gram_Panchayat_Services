const express = require('express');
const cors = require('cors');
const admin = require("firebase-admin");
const { Firestore } = require('@google-cloud/firestore');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const stripe = require('stripe')(process.env.Stripe_Secret_Key);
const endpointSecret = process.env.Stripe_Endpoint_Secret;

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
const PORT = process.env.PORT || 8000;

// Enable CORS
const corsOptions = {
  origin: [
    'https://digital-gram-panchayat-services-frontend.vercel.app',
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

    // Fetch user data from Firestore
    const userDoc = await db.collection("users").doc(uid).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      return res.json({ message: "Token verified", user: { ...userData, _id: uid } });
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).send("Token verification failed");
  }
});

app.post('/create-checkout-session', async (req, res) => {
  try {
    console.log(' checkout requirest came ---> ' + JSON.stringify(req.body))
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: req.body.service
            },
            unit_amount: req.body.price * 100
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: 'https://digital-gram-panchayat-services-frontend.vercel.app/user/payment-success',
      cancel_url: 'https://digital-gram-panchayat-services-frontend.vercel.app/user/payment-failed',
      metadata: {
        userId: req.body.userId,
        serviceId: req.body.serviceId,
        service: req.body.service,
      }
    });
    const paymentIntentId = session.payment_intent;
    console.log("***** paymentIntentId result : "+paymentIntentId)
    console.log("payment result : "+JSON.stringify(session))
    return res.status(200).json({id : session.id, paymentIntentId : paymentIntentId});
  } catch (error) {
    console.log('Error while making payment --> ' + JSON.stringify(error));
    return res.json({ id: null })
  }
})

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  let event;
  try {
    const sig = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed.`, err.message);
    return res.status(400).send('Webhook Error');
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object; // Stripe Checkout session object
    const paymentIntentId = session.payment_intent;

    // Retrieve the Payment Intent for additional details
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    console.log("transactionId : "+session.id);
    console.log("paymentIntentId : "+paymentIntentId);
    console.log("paymentIntent : "+paymentIntent);
    // Save transaction details to Firestore
    const transactionDetails = {
      userId: session.metadata.userId,
      serviceId: session.metadata.serviceId,
      serviceName: session.metadata.service,
      price: session.amount_total / 100,
      transactionId: session.id,
      paymentIntentId: paymentIntentId,
      status: 'succeeded',
      createdAt: new Date(),
    };
    console.log("transactionDetails : "+transactionDetails)
    await db.collection('transactions').add(transactionDetails);
  }

  res.status(200).json({ received: true });
});
// Start the Server
app.listen(PORT, (error) => {
  if (error) {
    console.error('Error starting server:', error);
  } else {
    console.log("Server running on PORT:", PORT);
  }
});