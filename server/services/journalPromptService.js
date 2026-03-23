const JournalPrompt = require('../models/journalPromptModel');
const createContentService = require('./contentServiceFactory');

module.exports = createContentService(JournalPrompt, 'JournalPrompt');
