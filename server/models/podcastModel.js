const mongoose = require('mongoose');
const {
    CONTENT_CATEGORIES,
    DEFAULT_CONTENT_CATEGORY
} = require('../constants/contentCategories');

const podcastSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: {
        type: String,
        enum: CONTENT_CATEGORIES,
        default: DEFAULT_CONTENT_CATEGORY,
        required: true
    },
    url: { type: String, required: true },
    platform: { 
        type: String, 
        enum: ['apple', 'spotify', 'other'], 
        default: 'other' 
    },
    likesCount: { type: Number, default: 0 },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    visibility: { 
        type: String, 
        enum: ['public', 'private'], 
        default: 'public' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Podcast', podcastSchema);
