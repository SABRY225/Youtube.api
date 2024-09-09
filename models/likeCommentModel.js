const mongoose = require('mongoose');

const likeCommentSchema = new mongoose.Schema({
    Type: {
        type: String,
        required: true,
        enum: ['Like', 'DisLike'] // Only "Like" and "DisLike" are allowed
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // userId is required
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: true // commentId is required
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('LikeComment', likeCommentSchema);
