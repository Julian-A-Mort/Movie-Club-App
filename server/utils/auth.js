const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

// Change to environment variables for security
const secret = process.env.JWT_SECRET;
const expiration = '2h';

const authMiddleware = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (token) {
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch (error) {
            console.error('Invalid token:', error.message);
        }
    }

    next();
};

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
