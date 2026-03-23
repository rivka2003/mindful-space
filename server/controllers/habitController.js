const habitService = require('../services/habitService');
const createContentController = require('./contentControllerFactory');

module.exports = createContentController(habitService);
