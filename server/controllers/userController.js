const userService = require('../services/userService');

const register = async (req, res, next) => {
    try {
        const result = await userService.registerUser(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await userService.loginUser(email, password);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const getMe = async (req, res, next) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        next(error);
    }
};

const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const updateUserByAdmin = async (req, res, next) => {
    try {
        const user = await userService.updateUserByAdmin(req.params.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const deleteUserByAdmin = async (req, res, next) => {
    try {
        const result = await userService.deleteUser(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const getFavorites = async (req, res, next) => {
    try {
        const favorites = await userService.getUserFavorites(req.user._id);
        res.status(200).json(favorites);
    } catch (error) {
        next(error);
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const updatedUser = await userService.updateUserProfile(req.user._id, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const result = await userService.changeUserPassword(req.user._id, oldPassword, newPassword);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const deleteMe = async (req, res, next) => {
    try {
        const result = await userService.deleteUser(req.user._id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    getMe,
    getUsers,
    updateUserByAdmin,
    deleteUserByAdmin,
    getFavorites,
    updateProfile,
    changePassword,
    deleteMe
};
