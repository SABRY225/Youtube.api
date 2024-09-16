const mongoose = require('mongoose');

const savePlaylistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    playlistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist',
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('SavePlaylist', savePlaylistSchema);
