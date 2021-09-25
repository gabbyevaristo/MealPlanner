import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // Check for token
    if (!token) {
        res.status(401).json({ msg: 'No token. Authorization denied.' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);

        // Take user id from token and put it in req.user, so whenever the
        // token is sent, we have the user stored in req value

        // Add user from payload
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ msg: 'Token is not valid.' });
    }
}

export default auth;
// module.exports = auth;
