const express = require('express');
const router = express.Router();
const podcastController = require('../controllers/podcastController');
const { protect, protectOptional } = require('../middleware/authMiddleware');

router.get('/', protectOptional, podcastController.getAll);
router.get('/mine', protect, podcastController.getMine);
router.get('/:id', protectOptional, podcastController.getById);

router.post('/', protect, podcastController.create);
router.put('/:id', protect, podcastController.update);
router.delete('/:id', protect, podcastController.remove);
router.post('/:id/like', protect, podcastController.like);
router.delete('/:id/like', protect, podcastController.unlike);

module.exports = router;
