const mongoose = require('mongoose');
const {
    CONTENT_CATEGORIES,
    DEFAULT_CONTENT_CATEGORY
} = require('../constants/contentCategories');

const habitSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
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
        default: 'private' // משתמש שיוצר לעצמו הרגל - בדרך כלל פרטי
    }
}, { timestamps: true });

module.exports = mongoose.model('Habit', habitSchema);
