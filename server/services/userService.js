const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const httpError = require('../utils/httpError');

const SALT_ROUNDS = 10;

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return bcrypt.hash(password, salt);
};

const comparePasswords = async (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword);
};

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES || '30d'
    });
};

const buildAuthResponse = (user) => {
    return {
        token: generateToken({
            id: user._id,
            role: user.role,
            email: user.email
        }),
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

const registerUser = async (userData) => {
    const { name, email, password } = userData;

    if (!name || !email || !password) {
        throw httpError(400, 'Name, email, and password are required');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        throw httpError(400, 'User already exists');
    }

    const user = await User.create({
        name,
        email,
        password: await hashPassword(password)
    });

    return buildAuthResponse(user);
};

const loginUser = async (email, password) => {
    if (!email || !password) {
        throw httpError(400, 'Email and password are required');
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw httpError(404, 'User not found');
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
        throw httpError(401, 'Invalid credentials');
    }

    return buildAuthResponse(user);
};

const getAllUsers = async () => {
    return User.find({}).select('-password');
};

const updateUserByAdmin = async (userId, updateData) => {
    const safeUpdateData = sanitizeAdminUpdate(updateData);

    if (Object.keys(safeUpdateData).length === 0) {
        throw httpError(400, 'No valid user fields provided');
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: safeUpdateData },
        { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
        throw httpError(404, 'User not found');
    }

    return updatedUser;
};

const updateUserProfile = async (userId, updateData) => {
    const safeUpdateData = sanitizeProfileUpdate(updateData);

    if (Object.keys(safeUpdateData).length === 0) {
        throw httpError(400, 'No valid profile fields provided');
    }

    if (safeUpdateData.password) {
        safeUpdateData.password = await hashPassword(safeUpdateData.password);
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: safeUpdateData },
        { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
        throw httpError(404, 'User not found');
    }

    return updatedUser;
};

const changeUserPassword = async (userId, oldPassword, newPassword) => {
    if (!oldPassword || !newPassword) {
        throw httpError(400, 'Old password and new password are required');
    }

    const user = await User.findById(userId);
    if (!user) {
        throw httpError(404, 'User not found');
    }

    const isMatch = await comparePasswords(oldPassword, user.password);
    if (!isMatch) {
        throw httpError(400, 'Old password incorrect');
    }

    user.password = await hashPassword(newPassword);
    await user.save();

    return { message: 'Password updated successfully' };
};

const deleteUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw httpError(404, 'User not found');
    }

    await user.deleteOne();
    return { message: 'User deleted successfully' };
};

const getUserFavorites = async (userId) => {
    const user = await User.findById(userId)
        .select('likedContent')
        .populate('likedContent.entityId');

    if (!user) {
        throw httpError(404, 'User not found');
    }

    return user.likedContent;
};

const sanitizeProfileUpdate = (updateData) => {
    const safeUpdate = {};
    const allowedFields = ['name', 'email', 'password'];

    for (const field of allowedFields) {
        if (updateData[field] !== undefined) {
            safeUpdate[field] = updateData[field];
        }
    }

    return safeUpdate;
};

const sanitizeAdminUpdate = (updateData) => {
    const safeUpdate = {};
    const allowedFields = ['name', 'email', 'role'];

    for (const field of allowedFields) {
        if (updateData[field] !== undefined) {
            safeUpdate[field] = updateData[field];
        }
    }

    return safeUpdate;
};

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    updateUserByAdmin,
    updateUserProfile,
    changeUserPassword,
    deleteUser,
    getUserFavorites
};
