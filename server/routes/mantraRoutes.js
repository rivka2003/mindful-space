const express = require('express');
const router = express.Router();
const mantraController = require('../controllers/mantraController');
const { protect, protectOptional } = require('../middleware/authMiddleware');

router.get('/', protectOptional, mantraController.getAll);
router.get('/mine', protect, mantraController.getMine);
router.get('/:id', protectOptional, mantraController.getById);

router.post('/', protect, mantraController.create);
router.put('/:id', protect, mantraController.update);
router.delete('/:id', protect, mantraController.remove);
router.post('/:id/like', protect, mantraController.like);
router.delete('/:id/like', protect, mantraController.unlike);
router.post('/:id/reminder', protect, mantraController.activateReminder);
router.delete('/:id/reminder', protect, mantraController.deactivateReminder);

module.exports = router;
