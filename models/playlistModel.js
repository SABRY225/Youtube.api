const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    videosId: {
        type: [mongoose.Schema.Types.ObjectId],  
        ref: 'Video',
        required: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'User',
        required: true
    },
});

module.exports = mongoose.model('Playlist', playlistSchema);
