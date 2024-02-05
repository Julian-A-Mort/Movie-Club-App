require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Membership = require('./models/Membership');

if (!process.env.JWT_SECRET || !process.env.MONGODB_URI) {
  console.error("Missing critical environment variables. Exiting...");
  process.exit(1);
}

const app = express();
app.use(cors());

// Mongoose connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Body parsers for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authentication middleware
app.use(authMiddleware);

// Apollo Server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.user })
});

async function startServer() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  // Serve static files from the React app in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
    });
  }

  // Start Express server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Stripe payment intent
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'aud',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ error: error.message });
  }
});

startServer();