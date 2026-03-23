const mantraService = require('../services/mantraService');
const createContentController = require('./contentControllerFactory');

module.exports = createContentController(mantraService);
