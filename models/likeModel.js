const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const likeSchema = new mongoose.Schema({
    Type: {
        type: String,
        required: true,
        enum: ['Like', 'DisLike']

    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Like', likeSchema);
