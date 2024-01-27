const mongoose = require('mongoose');

const { Schema } = mongoose;

// if needing to require models
// const ? = require('./?');

const eventSchema = new Schema({
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
    date: {
        type: Date,
        required: true,
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
      }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
