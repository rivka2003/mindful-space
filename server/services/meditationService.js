const Meditation = require('../models/meditationModel');
const createContentService = require('./contentServiceFactory');

module.exports = createContentService(Meditation, 'Meditation');
