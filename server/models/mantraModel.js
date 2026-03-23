const mongoose = require('mongoose');
const {
    CONTENT_CATEGORIES,
    DEFAULT_CONTENT_CATEGORY
} = require('../constants/contentCategories');

const mantraSchema = new mongoose.Schema({
    text: { type: String, required: true },
    category: {
        type: String,
        enum: CONTENT_CATEGORIES,
        default: DEFAULT_CONTENT_CATEGORY,
        required: true
    },
    reminderType: {
        type: String,
        enum: ['email', 'sms', 'none'],
        default: 'none'
    },
    reminderTime: { type: String }, // פורמט "HH:mm" (למשל "08:00")
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

module.exports = mongoose.model('Mantra', mantraSchema);
