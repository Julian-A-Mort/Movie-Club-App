const { User, Movie, Membership, Event } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const axios = require('axios'); 

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
},



    //business logic
    // order: async (parent, { _id }, context) => {
    //   if (context.user) {
    //     const user = await User.findById(context.user._id).populate({
    //       path: 'orders.products',
    //       populate: 'category',
    //     });

    //     return user.orders.id(_id);
    //   }

    //   throw AuthenticationError;
    // },
    // checkout: async (parent, args, context) => {
    //   const url = new URL(context.headers.referer).origin;
    //   // We map through the list of products sent by the client to extract the _id of each item and create a new Order.
    //   await Order.create({ products: args.products.map(({ _id }) => _id) });
    //   const line_items = [];

    //   for (const product of args.products) {
    //     line_items.push({
    //       price_data: {
    //         currency: 'aud',
    //         product_data: {
    //           name: product.name,
    //           description: product.description,
    //           images: [`${url}/images/${product.image}`],
    //         },
    //         unit_amount: product.price * 100,
    //       },
    //       quantity: product.purchaseQuantity,
    //     });
    //   }

    //   const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ['card'],
    //     line_items,
    //     mode: 'payment',
    //     success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
    //     cancel_url: `${url}/`,
    //   });

    //   return { session: session.id };
    // },
//   },

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

    updateUser: async (parent, { _id, userName, firstName, lastName, email }, context) => {
        if (!context.user) {
            throw new AuthenticationError('You need to be logged in');
        }
        if (context.user._id.toString() === _id || context.user.role === 'admin') {
            return await User.findByIdAndUpdate(_id, { userName, firstName, lastName, email }, { new: true });
        }
        throw new AuthenticationError('Not authorized');
    },
    

    deleteUser: async (parent, { _id }, context) => {
        return await User.findByIdAndDelete(_id);
    },

    //movie mutations
    addMovie: async (parent, { title, description, releaseYear, genre, director, image }, context) => {
        if (!context.user || context.user.role !== 'admin') {
            throw new AuthenticationError('You need to be logged in and must be an admin');
        }
        return await Movie.create({ title, description, releaseYear, genre, director, image });
    },

    updateMovie: async (parent, { _id, title, description, releaseYear, genre, director, image }, context) => {
        if (!context.user || context.user.role !== 'admin') {
            throw new AuthenticationError('You need to be logged in and must be an admin');
        }
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
        if (!context.user || context.user.role !== 'admin') {
            throw new AuthenticationError('You need to be logged in and must be an admin');
        }
        return await Event.findByIdAndUpdate(_id, { title, description, date, movie }, { new: true });
    },    

    deleteEvent: async (parent, { _id }, context) => {
        return await Event.findByIdAndDelete(_id);
    },

    //login mutation
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
