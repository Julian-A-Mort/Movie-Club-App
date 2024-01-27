const mongoose = require('mongoose');

const { Schema } = mongoose;

// if needing to require models
// const ? = require('./?');

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    releaseYear: {
        type: Number,
        required: true,
    },
    genre: {
        type: String,
        required: true,
        trim: true,
    },
    director: {
        type: String,
        required: true,
    },
    // image: {
    //     type: String
    //   },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
