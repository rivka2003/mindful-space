const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const resolveUserFromToken = async (authorizationHeader) => {
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
        return null;
    }

    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

const protect = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401);
        return next(new Error('Not authorized, no token'));
    }

    try {
        req.user = await resolveUserFromToken(req.headers.authorization);
        next();
    } catch (error) {
        res.status(401);
        next(new Error('Not authorized, token failed'));
    }
};

const protectOptional = async (req, res, next) => {
    if (!req.headers.authorization) {
        req.user = null;
        return next();
    }

    try {
        req.user = await resolveUserFromToken(req.headers.authorization);
        next();
    } catch (error) {
        res.status(401);
        next(new Error('Not authorized, token failed'));
    }
};

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403);
        next(new Error('Access denied: admin permission required'));
    }
};

module.exports = { protect, protectOptional, adminOnly };
