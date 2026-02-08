const userService = require('../services/userService');

// @desc    Register new user
// @route   POST /api/users/register
const register = async (req, res, next) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

// @desc    Login user
// @route   POST /api/users/login
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userService.loginUser(email, password);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// @desc    Get user profile (example of using protect middleware)
// @route   GET /api/users/me
const getMe = async (req, res, next) => {
    try {
        // req.user מגיע מה-protect middleware
        res.status(200).json(req.user);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all users (Admin only)
const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) { next(error); }
};

// @desc    Update user profile
const updateProfile = async (req, res, next) => {
    try {
        // אנחנו מעדכנים את המשתמש שכרגע מחובר (מגיע מהטוקן)
        const updatedUser = await userService.updateUserProfile(req.user._id, req.body);
        res.status(200).json(updatedUser);
    } catch (error) { next(error); }
};

// @desc    Delete user
const deleteMe = async (req, res, next) => {
    try {
        const result = await userService.deleteUser(req.user._id);
        res.status(200).json(result);
    } catch (error) { next(error); }
};

module.exports = { 
    register, login, getMe, 
    getUsers, updateProfile, deleteMe 
};