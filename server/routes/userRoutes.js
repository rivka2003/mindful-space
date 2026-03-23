const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);

router.get('/me', protect, getMe);
router.get('/favorites', protect, getFavorites);
router.get('/', protect, adminOnly, getUsers);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);
router.delete('/delete', protect, deleteMe);
router.put('/:id', protect, adminOnly, updateUserByAdmin);
router.delete('/:id', protect, adminOnly, deleteUserByAdmin);

module.exports = router;
