const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');


// change to environment variables for security
const secret = process.env.JWT_SECRET;
const expiration = '2h';

// module.exports = {
//     // Custom GraphQL authentication error
//     AuthenticationError: new GraphQLError('Could not authenticate user.', {
//       extensions: {
//         code: 'UNAUTHENTICATED',
//       },
//     }),

 // Middleware for authenticating JWT tokens
//  alt method: authMiddleware: function ({ req }) {

const authMiddleware = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (token) {
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }
    }

    next();
};

//     if (!token) {
//       return req;
//     }

//     try {
//       const { data } = jwt.verify(token, secret, { maxAge: expiration });
//       req.user = data;
//     } catch {
//       console.log('Invalid token');
//     }

//     return req;
//   },

  // Function to sign a token
  const signToken = ({ username, email, _id }) => {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    };

    module.exports = {
        authMiddleware,
        signToken, 
        AuthenticationError
    };