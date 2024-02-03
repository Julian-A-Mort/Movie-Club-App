const { User, Movie, Membership, Event } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const axios = require('axios'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const stripe = require('stripe')('insert numbers');

const resolvers = {
  Query: {
    movies: async () => {
      return await Movie.find();
    },
    events: async () => {
        return await Event.find();
    },
    memberships: async () => {
        return await Membership.find();
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('memberships');
        return user;
      }
      throw new AuthenticationError('Not authenticated');
    },
    users: async () => {
        const users = await User.find().populate('memberships');
        return users;
      }
},



  Mutation: {
    //user mutations
    // signup: async (parent, { userName, firstName, lastName, email, password }) => {
    //     const user = await User.create({ userName, firstName, lastName, email, password });
    //     const token = signToken(user);
    //     return { token, user };
    // },

    signup: async (parent, { userName, firstName, lastName, email, password }) => {
        console.log(`Signup Request: `, { userName, firstName, lastName, email, password });
        try {
            const user = await User.create({ userName, firstName, lastName, email, password });
            const token = signToken(user);
            console.log(`Signup Success: `, { user, token });
            return { token, user };
        } catch (error) {
            console.error(`Signup Error: `, error);
            // You might want to handle different types of errors differently
            throw new Error('Error signing up');
        }
    },

    addUser: async (parent, { userName, firstName, lastName, email, password }) => {
      try {
          const newUser = await User.create({ userName, firstName, lastName, email, password });
          const token = signToken(newUser);
          
          console.log(`AddUser Success: `, { newUser, token });
          return { token, newUser }; // Depending on your client's needs, you might not need to return a token here
      } catch (error) {
          console.error(`AddUser Error: `, error);
          throw new Error('Error adding user');
      }
  },


    updateUser: async (parent, { _id, userName, firstName, lastName, email }, context) => {
        // if (context.user._id.toString() === _id || context.user.role === 'admin') {
            return await User.findByIdAndUpdate(_id, { userName, firstName, lastName, email }, { new: true });
        // }
        // throw new AuthenticationError('Not authorized');
    },
    

    deleteUser: async (parent, { _id }, context) => {
        return await User.findByIdAndDelete(_id);
    },

    //movie mutations
    addMovie: async (_, { title, description, releaseYear, genre, director, posterPath, tmdbId }) => {
      try {
          const newMovie = await Movie.create({
            title,
            description,
            releaseYear,
            genre,
            director,
            posterPath,
            tmdbId
          });
          
          console.log(`AddMovie Success: `, newMovie);
          return newMovie; // Directly return the new movie object
      } catch (error) {
          console.error(`AddMovie Error: `, error);
          throw new Error('Error adding movie');
      }
    },
    

    updateMovie: async (parent, { _id, title, description, releaseYear, genre, director, image }, context) => {
        return await Movie.findByIdAndUpdate(_id, { title, description, releaseYear, genre, director, image }, { new: true });
    },    

    deleteMovie: async (parent, { _id }, context) => {
        return await Movie.findByIdAndDelete(_id);
    },

    //membership mutations
    addMembership: async (parent, { title, description, startDate, endDate, status, userId }, context) => {
        return await Membership.create({ title, description, startDate, endDate, status, userId });
    },

    updateMembership: async (parent, { _id, title, description, startDate, endDate, status }, context) => {
        return await Membership.findByIdAndUpdate(_id, { title, description, startDate, endDate, status }, { new: true });
    },

    deleteMembership: async (parent, { _id }, context) => {
        return await Membership.findByIdAndDelete(_id);
    },

    //event mutations
    addEvent: async (parent, { title, description, date, movie }, context) => {
        return await Event.create({ title, description, date, movie });
    },    

    updateEvent: async (parent, { _id, title, description, date, movie }, context) => {
        return await Event.findByIdAndUpdate(_id, { title, description, date, movie }, { new: true });
    },    

    deleteEvent: async (parent, { _id }, context) => {
        return await Event.findByIdAndDelete(_id);
    },

    //login mutation
    login: async (_, { email, password }) => {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('User not found');
        }
  
        // Check if password is correct
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          throw new Error('Invalid password');
        }
  
        // Generate JWT token
        const token = generateToken(user);
  
        // Return the authentication token and user info
        return {
          token,
          user,
        };
      },
    },
  };
  
  // This function is called after verifying the user's credentials
  function generateToken(user) {
    const tokenPayload = {
      id: user.id,
      userName: user.userName,
      role: user.role, // Include the user's role in the token payload
    };
  
    return jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
module.exports = resolvers;
