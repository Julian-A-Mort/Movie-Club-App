const express = require('express');
const { ApolloServer } = require('apollo-server-express');
// const { MongoClient, ServerApiVersion } = require('mongodb'); not required?
const mongoose = require('mongoose');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
require('dotenv').config();

if (!process.env.JWT_SECRET || !process.env.MONGODB_URI) {
  console.error("Missing critical environment variables. Exiting...");
  process.exit(1);
}

const app = express();

// const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri, {
//   serverApi: ServerApiVersion.v1
// });

// Mongoose connection 
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// //connect to MongoDB
// async function connectToMongoDB() {
//     try {
//       await client.connect();
//       console.log("Connected to MongoDB");
  
//     } catch (error) {
//       console.error("Failed to connect to MongoDB", error);
//     }
//   }

// Body parsers for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// authentication middleware
app.use(authMiddleware);

// Apollo Server
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ user: req.user }) // Pass the user context to resolvers
});

async function startServer() {
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: '/graphql' });

    // Serve static files from the React app in production
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
        });
    }

    // Start Express server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startServer();
