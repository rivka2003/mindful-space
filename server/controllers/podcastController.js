const podcastService = require('../services/podcastService');
const createContentController = require('./contentControllerFactory');

module.exports = createContentController(podcastService);
