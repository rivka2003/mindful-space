const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' 
    },
    // מבנה פנימי לשמירת לייקים מכל סוגי התוכן
    likedContent: [{
        entityType: { 
            type: String, 
            required: true, 
            enum: ['Mantra', 'Meditation', 'Podcast', 'Habit', 'JournalPrompt'] 
        },
        entityId: { 
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            refPath: 'likedContent.entityType' // מאפשר למונגוס לדעת לאיזה מודל להתייחס
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);