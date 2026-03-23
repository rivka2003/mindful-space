const Habit = require('../models/habitModel');
const createContentService = require('./contentServiceFactory');

module.exports = createContentService(Habit, 'Habit');
