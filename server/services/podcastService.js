const Podcast = require('../models/podcastModel');
const createContentService = require('./contentServiceFactory');

module.exports = createContentService(Podcast, 'Podcast');
