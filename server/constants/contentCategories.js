const CONTENT_CATEGORIES = [
    'general',
    'calm',
    'focus',
    'resilience',
    'vitality',
    'flow',
    'manifesting'
];

const DEFAULT_CONTENT_CATEGORY = 'general';

const isValidContentCategory = (category) => CONTENT_CATEGORIES.includes(category);

module.exports = {
    CONTENT_CATEGORIES,
    DEFAULT_CONTENT_CATEGORY,
    isValidContentCategory
};
