const Playlist = require('../models/playlistModel');

// Get all playlists
const getPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find(req.userId);
        res.status(200).json(playlists);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching playlists', error });
    }
};

// Get a specific playlist by ID
const getPlaylist = async (req, res) => {
    const { playlistId } = req.params;
    try {
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching playlist', error });
    }
};

// Create a new playlist
const createPlaylist = async (req, res) => {
    const userId = req.userId
    const { name } = req.body;
    try {
        const newPlaylist = new Playlist({ name,userId });
        await newPlaylist.save();
        res.status(201).json({ message: 'creating playlist successfully',success: true  });
    } catch (error) {
        res.status(400).json({ message: 'Error creating playlist',success: false });
    }
};

// Update a playlist by ID
const updatePlaylist = async (req, res) => {
    const { playlistId } = req.params;
    const { name, videosId } = req.body;
    try {
        const updatedPlaylist = await Playlist.findByIdAndUpdate(
            playlistId,
            { name, videosId },
            { new: true }
        );
        if (!updatedPlaylist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        res.status(200).json(updatedPlaylist);
    } catch (error) {
        res.status(400).json({ message: 'Error updating playlist', error });
    }
};

// Delete a playlist by ID
const deletePlaylist = async (req, res) => {
    const { playlistId } = req.params;
    try {
        const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);
        if (!deletedPlaylist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        res.status(200).json({ message: 'Playlist deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting playlist', error });
    }
};

module.exports = {
    getPlaylists,
    getPlaylist,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
};
