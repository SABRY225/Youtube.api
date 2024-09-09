const Video = require('../models/videoModel');

// Get all videos
const getVideos = async (req, res) => {
    try {
        const videos = await Video.find().populate('userId').populate('categoryId');
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching videos', error });
    }
};

// Get a specific video by ID
const getVideo = async (req, res) => {
    const { videoId } = req.params;
    try {
        const video = await Video.findById(videoId).populate('userId').populate('categoryId');
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching video', error });
    }
};

// Create a new video
const createVideo = async (req, res) => {
    const { title, description, thumbnailPath, views, uploadDate, userId, categoryId } = req.body;
    try {
        const newVideo = new Video({ title, description, thumbnailPath, views, uploadDate, userId, categoryId });
        await newVideo.save();
        res.status(201).json(newVideo);
    } catch (error) {
        res.status(400).json({ message: 'Error creating video', error });
    }
};

// Update a video by ID
const updateVideo = async (req, res) => {
    const { videoId } = req.params;
    const { title, description, thumbnailPath, views, uploadDate, userId, categoryId } = req.body;
    try {
        const updatedVideo = await Video.findByIdAndUpdate(
            videoId,
            { title, description, thumbnailPath, views, uploadDate, userId, categoryId },
            { new: true }
        ).populate('userId').populate('categoryId');
        if (!updatedVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json(updatedVideo);
    } catch (error) {
        res.status(400).json({ message: 'Error updating video', error });
    }
};

// Delete a video by ID
const deleteVideo = async (req, res) => {
    const { videoId } = req.params;
    try {
        const deletedVideo = await Video.findByIdAndDelete(videoId);
        if (!deletedVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting video', error });
    }
};

module.exports = {
    getVideos,
    getVideo,
    createVideo,
    updateVideo,
    deleteVideo,
};
