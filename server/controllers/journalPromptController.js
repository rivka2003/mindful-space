const journalPromptService = require('../services/journalPromptService');
const createContentController = require('./contentControllerFactory');

module.exports = createContentController(journalPromptService);
