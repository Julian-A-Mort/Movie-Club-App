const mongoose = require('mongoose');

const { Schema } = mongoose;

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
    posterPath: {
        type: String,
        required: true
    },
    tmdbId: { 
        type: String,
        required: true
    },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
