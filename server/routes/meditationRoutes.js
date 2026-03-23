const express = require('express');
const router = express.Router();
const meditationController = require('../controllers/meditationController');
const { protect, protectOptional } = require('../middleware/authMiddleware');

router.get('/', protectOptional, meditationController.getAll);
router.get('/mine', protect, meditationController.getMine);
router.get('/:id', protectOptional, meditationController.getById);

router.post('/', protect, meditationController.create);
router.put('/:id', protect, meditationController.update);
router.delete('/:id', protect, meditationController.remove);
router.post('/:id/like', protect, meditationController.like);
router.delete('/:id/like', protect, meditationController.unlike);

module.exports = router;
