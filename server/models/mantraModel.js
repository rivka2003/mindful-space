const mongoose = require('mongoose');

const mantraSchema = new mongoose.Schema({
    text: { type: String, required: true },
    category: { type: String, required: true },
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