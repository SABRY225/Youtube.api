const LikeComment = require('../models/likeCommentModel');

// Create a new like/dislike on a comment
const createLikeComment = async (req, res) => {
  try {
    const userId=req.userId
    const { Type, commentId } = req.body;

    // Check if the user has already liked/disliked the comment
    const existingLikeComment = await LikeComment.findOne({ userId, commentId });
    if (existingLikeComment) {
      return res.status(400).json({ message: `User has already ${existingLikeComment.Type} this comment.` });
    }

    // Create a new LikeComment instance
    const newLikeComment = new LikeComment({ Type, userId, commentId });

    // Save to the database
    await newLikeComment.save();

    res.status(201).json({message:'add Like Comment',success:true});
  } catch (error) {
    res.status(500).json({ message: error.message ,success:false});
  }
};

// Get all counts likes/dislikes for a specific comment
const getLikesComments = async (req, res) => {
  try {
    const { commentId } = req.params;
    const countLike=await LikeComment.find({ commentId }).countDocuments({Type:'Like'})
    const countDisLike=await LikeComment.find({ commentId }).countDocuments({Type:'DisLike'})
    return res.status(200).json({countLike,countDisLike});
  } catch (error) {
    return res.status(500).json({ message: error.message });
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

    res.status(200).json({ message: 'Like/Dislike deleted successfully',success:true });
  } catch (error) {
    res.status(500).json({ message: error.message,success:false });
  }
};

const checkLikeComment = async (req, res) => {
  try {
    const userId = req.userId; // Get the userId from the request object
    const { commentId } = req.params; // Get the commentId from the URL parameters
    
    // Find a single document matching the userId and commentId
    const existingLikeComment = await LikeComment.findOne({ userId, commentId });

    if (existingLikeComment) {
      // If found, return the type of like (e.g., 'like' or 'dislike')
      return res.status(200).json({ Type: existingLikeComment.Type });
    } else {
      // If not found, return Type as false
      return res.status(200).json({ Type: false });
    }
  } catch (error) {
    // Handle server errors and return a 500 status code
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = {
  createLikeComment,
  getLikesComments,
  deleteLikeComment,
  checkLikeComment
};
