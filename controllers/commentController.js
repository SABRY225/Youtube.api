const Comment = require('../models/commentModel');

// Get all comments for a specific video
const getComments = async (req, res) => {
    const { videoId } = req.params;
    try {
        const comments = await Comment.find({ videoId });
        res.status(200).json(comments);
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
    const { userId, videoId } = req.params;
    const { content } = req.body;
    try {
        const newComment = new Comment({ userId, videoId, content });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ message: 'Error creating comment', error });
    }
};

// Edit an existing comment
const editComment = async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    try {
        const updatedComment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true });
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(201).json(updatedComment);
    } catch (error) {
        res.status(400).json({ message: 'Error editing comment', error });
    }
};

// Delete a comment
const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(201).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error });
    }
};

module.exports = {
    getComments,
    getComment,
    createComment,
    editComment,
    deleteComment,
};
