const Like = require('../models/likeModel');

// Create a new like/dislike for a video
const createLike = async (req, res) => {
  try {
    const { Type, userId, videoId } = req.body;

    // Check if the user has already liked/disliked the video
    const existingLike = await Like.findOne({ userId, videoId });
    if (existingLike) {
      return res.status(400).json({ message: 'User has already liked/disliked this video.' });
    }

    // Create a new Like instance
    const newLike = new Like({ Type, userId, videoId });

    // Save to the database
    const savedLike = await newLike.save();

    res.status(201).json(savedLike);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all likes/dislikes for a specific video
const getLikes = async (req, res) => {
  try {
    const { videoId } = req.params;

    // Find all likes/dislikes for the specific video
    const likes = await Like.find({ videoId }).populate('userId');

    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a like/dislike by ID
const deleteLike = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the Like by ID
    const deletedLike = await Like.findByIdAndDelete(id);

    if (!deletedLike) {
      return res.status(404).json({ message: 'Like/Dislike not found' });
    }

    res.status(200).json({ message: 'Like/Dislike deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createLike,
  getLikes,
  deleteLike
};
