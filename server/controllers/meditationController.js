const meditationService = require('../services/meditationService');
const createContentController = require('./contentControllerFactory');

module.exports = createContentController(meditationService);
