const LikeComment = require('../models/likeCommentModel');

// Create a new like/dislike on a comment
const createLikeComment = async (req, res) => {
  try {
    const { Type, userId, commentId } = req.body;

    // Check if the user has already liked/disliked the comment
    const existingLikeComment = await LikeComment.findOne({ userId, commentId });
    if (existingLikeComment) {
      return res.status(400).json({ message: 'User has already liked/disliked this comment.' });
    }

    // Create a new LikeComment instance
    const newLikeComment = new LikeComment({ Type, userId, commentId });

    // Save to the database
    const savedLikeComment = await newLikeComment.save();

    res.status(201).json(savedLikeComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all likes/dislikes for a specific comment
const getLikesComments = async (req, res) => {
  try {
    const { commentId } = req.params;

    // Find all LikeComments for a specific comment
    const likesComments = await LikeComment.find({ commentId }).populate('userId');

    res.status(200).json(likesComments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a like/dislike by ID
const deleteLikeComment = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the LikeComment by ID
    const deletedLikeComment = await LikeComment.findByIdAndDelete(id);

    if (!deletedLikeComment) {
      return res.status(404).json({ message: 'Like/Dislike not found' });
    }

    res.status(200).json({ message: 'Like/Dislike deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createLikeComment,
  getLikesComments,
  deleteLikeComment
};
