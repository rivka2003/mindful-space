const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');
const { protect, protectOptional } = require('../middleware/authMiddleware');

router.get('/', protectOptional, habitController.getAll);
router.get('/mine', protect, habitController.getMine);
router.get('/:id', protectOptional, habitController.getById);

router.post('/', protect, habitController.create);
router.put('/:id', protect, habitController.update);
router.delete('/:id', protect, habitController.remove);
router.post('/:id/like', protect, habitController.like);
router.delete('/:id/like', protect, habitController.unlike);
router.post('/:id/reminder', protect, habitController.activateReminder);
router.delete('/:id/reminder', protect, habitController.deactivateReminder);

module.exports = router;
