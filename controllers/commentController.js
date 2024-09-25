const Comment = require('../models/commentModel');

// Get all comments for a specific video
const getComments = async (req, res) => {
    const { videoId } = req.params;
    const userId = req.userId
    try {
        let comments = await Comment.find({ videoId  }).populate('userId');
        const counts=await Comment.countDocuments({ videoId, userId })
        comments = comments.map(comment=>({
            id:comment._id,
            content:comment.content,
            userId:comment.userId._id,
            userName:comment.userId.userName,
            profilePicture:comment.userId.profilePicture
        }))
        res.status(200).json({comments,counts});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error });
    }
};

// Get a single comment by ID
const getComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comment', error });
    }
};

// Create a new comment
const createComment = async (req, res) => {
    try {
        const userId=req.userId
        const { videoId } = req.params;
        const { content } = req.body;
        const newComment = new Comment({ userId, videoId, content });
        await newComment.save();
        res.status(201).json({ message: 'Comment created successfully',success:true });
    } catch (error) {
        res.status(400).json({ message: error.message, success:false });
    }
};

// Edit an existing comment
const editComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true });
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found',success:false  });
        }
        res.status(201).json({ message: 'Comment update successfully',success:true });
    } catch (error) {
        res.status(400).json({ message:'Error editing comment', success:false });
    }
};

// Delete a comment
const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found',success:true });
        }
        return res.status(201).json({ message: 'Comment deleted successfully',success:true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success:false });
    }
};

module.exports = {
    getComments,
    getComment,
    createComment,
    editComment,
    deleteComment,
};
