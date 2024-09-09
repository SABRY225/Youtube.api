const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const likeCommentSchema = new mongoose.Schema({
    Type: {
        type: String,
        required: true,
        enum: ['Like', 'DisLike']

    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    },
});

module.exports = mongoose.model('LikeComment', likeCommentSchema);
