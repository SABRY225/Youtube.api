const SavePlaylist = require('../models/savePlaylistModel');
const SaveVideo = require('../models/saveVideoModel');

const getSaveVideos = async (req, res) => {
    try {
        const savedVideos = await SaveVideo.find({ userId: req.userId }).populate('videoId');
        res.status(200).json(savedVideos);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch saved videos', error });
    }
};

const getSavePlaylists = async (req, res) => {
    try {
        const savedPlaylists = await SavePlaylist.find({ userId: req.userId }).populate('playlistId');
        res.status(200).json(savedPlaylists);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch saved playlists', error });
    }
};

const savePlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const newSavePlaylist = new SavePlaylist({
            userId: req.user.id,
            playlistId: playlistId
        });
        await newSavePlaylist.save();
        res.status(201).json(newSavePlaylist);
    } catch (error) {
        res.status(500).json({ message: 'Failed to save playlist', error });
    }
};

const deleteSavePlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params;
        await SavePlaylist.deleteOne({ userId: req.user.id, playlistId });
        res.status(200).json({ message: 'Playlist removed from saved list' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete saved playlist', error });
    }
};

const saveVideo = async (req, res) => {
    try {
        const { videoId } = req.params;
        const newSaveVideo = new SaveVideo({
            userId: req.user.id,
            videoId: videoId
        });
        await newSaveVideo.save();
        res.status(201).json(newSaveVideo);
    } catch (error) {
        res.status(500).json({ message: 'Failed to save video', error });
    }
};

const deleteSaveVideo = async (req, res) => {
    try {
        const { videoId } = req.params;
        await SaveVideo.deleteOne({ userId: req.user.id, videoId });
        res.status(200).json({ message: 'Video removed from saved list' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete saved video', error });
    }
};

module.exports = {
    deleteSaveVideo,
    saveVideo,
    deleteSavePlaylist,
    savePlaylist,
    getSavePlaylists,
    getSaveVideos
}