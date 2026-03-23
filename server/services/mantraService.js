const Mantra = require('../models/mantraModel');
const createContentService = require('./contentServiceFactory');

module.exports = createContentService(Mantra, 'Mantra');
