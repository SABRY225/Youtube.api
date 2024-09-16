const mongoose = require('mongoose');

const saveVideoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    VideoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('SaveVideo', saveVideoSchema);
