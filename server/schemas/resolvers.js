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
    tmdbId: async () => {
        return process.env.MOVIE_API_KEY;
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('memberships');
        return user;
      }

      throw new AuthenticationError('Not authenticated');
    },

    // Query for if movie poster needs to be fetched outside normal function
    movieDetails: async (parent, { tmdbId }) => {
        // Check if the movie already exists in the database
        let movie = await Movie.findOne({ tmdbId });
        if (!movie) {
            // Movie not in database, fetch from TMDb API
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${process.env.MOVIE_API_KEY}`);
                const posterPath = `https://image.tmdb.org/t/p/original${response.data.poster_path}`;

                // Create new movie in the database with the fetched poster path
                movie = new Movie({ tmdbId, posterPath });
                await movie.save();
            } catch (error) {
                throw new Error('Failed to fetch movie details from TMDb');
            }
        }
        return movie; // Return the movie data (which now includes the poster path)
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
    addMembership: async (parent, { userId, ...otherData }) => {
        const newMembership = new Membership({
            userId,
            ...otherData,
            endDate: new Date(Date.now() + 100 * 24 * 60 * 60 * 1000)
        });
        return await newMembership.save();
    },

    signup: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
    },

    updateUser: async (parent, args, context) => {
        if (!context.user) {
            throw new AuthenticationError('You need to be logged in');
        }
        if (context.user._id.toString () === args._id || context.user.role === 'admin') {
            return await User.findByIdAndUpdate(args._id, args, { new: true });
        }
        throw new AuthenticationError('Not authorized');
    },

    addMovie: async (parent, args, context) => {
        if (!context.user) {
            throw new AuthenticationError('You need to be logged in');
        }
        if (context.user.role !== 'admin') {
            throw new AuthenticationError('You are not an admin!');
        }
        return await Movie.create(args);
    },

    updateMovie: async (parent, { movieId, updateData }, context) => {
        if (!context.user || context.user.role !== 'admin') {
            throw new AuthenticationError('You need to be logged in and must be an admin');
        }
        return await Movie.findByIdAndUpdate(movieId, updateData, { new: true });
    },
    

    updateEvent: async (parent, { eventId, updateData }, context) => {
        if (!context.user || context.user.role !== 'admin') {
            throw new AuthenticationError('You need to be logged in and must be an admin');
        }
        return await Event.findByIdAndUpdate(eventId, updateData, { new: true });
    },

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
