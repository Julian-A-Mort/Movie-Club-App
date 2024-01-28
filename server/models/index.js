const mongoose = require('mongoose');

// Import individual models
const User = require('./User');
const Movie = require('./Movie');
const Membership = require('./Membership');
const Event = require('./Event');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Export the models for use in other parts of your application
module.exports = {
    User,
    Movie,
    Membership,
    Event,
};
