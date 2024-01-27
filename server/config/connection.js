const mongoose = require('mongoose');

// add website
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dbname', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

// mongoose.connection.on('error', err => {
//     console.error(`MongoDB connection error: ${err}`);
//     process.exit(1); // Optional: Exit the application on database connection error
// });

module.exports = mongoose.connection;
