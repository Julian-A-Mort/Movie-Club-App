const { User, Movie, Membership, Event } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

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
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    
    addMembership: async (parent, { userId, ...otherData }) => {
        const newMembership = new Membership({
            userId,
            ...otherData,
            endDate: new Date(Date.now() + 100 * 24 * 60 * 60 * 1000)
        });
        return await newMembership.save();
    },


    ///

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
