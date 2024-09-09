const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
    },
});

module.exports = mongoose.model('Comment', commentSchema);
