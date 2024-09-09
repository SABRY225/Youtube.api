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
        type: [String],  
        required: true
    },
});

module.exports = mongoose.model('Playlist', playlistSchema);
