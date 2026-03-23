const express = require('express');
const router = express.Router();
const journalPromptController = require('../controllers/journalPromptController');
const { protect, protectOptional } = require('../middleware/authMiddleware');

router.get('/', protectOptional, journalPromptController.getAll);
router.get('/mine', protect, journalPromptController.getMine);
router.get('/:id', protectOptional, journalPromptController.getById);

router.post('/', protect, journalPromptController.create);
router.put('/:id', protect, journalPromptController.update);
router.delete('/:id', protect, journalPromptController.remove);
router.post('/:id/like', protect, journalPromptController.like);
router.delete('/:id/like', protect, journalPromptController.unlike);

module.exports = router;
