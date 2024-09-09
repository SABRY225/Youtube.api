const express = require('express');
const router = express.Router();
const likeCommentController = require('../controllers/likeCommentController');

/**
 * @swagger
 * tags:
 *   name: LikeComment
 */

/**
 * @swagger
 * /api/likeComment:
 *   post:
 *     summary: Like or dislike a comment
 *     tags: [LikeComment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Type:
 *                 type: string
 *                 enum: ['Like', 'DisLike']
 *                 description: Whether it's a Like or DisLike
 *               userId:
 *                 type: string
 *                 description: ID of the user liking/disliking the comment
 *               commentId:
 *                 type: string
 *                 description: ID of the comment being liked/disliked
 *     responses:
 *       201:
 *         description: Like/Dislike created successfully
 *       400:
 *         description: User has already liked/disliked this comment
 *       500:
 *         description: Server error
 */
router.post('/', likeCommentController.createLikeComment);

/**
 * @swagger
 * /api/likeComment/{commentId}:
 *   get:
 *     summary: Get all likes/dislikes for a comment
 *     tags: [LikeComment]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the comment
 *     responses:
 *       200:
 *         description: List of likes/dislikes
 *       500:
 *         description: Server error
 */
router.get('/:commentId', likeCommentController.getLikesComments);

/**
 * @swagger
 * /api/likeComment/{id}:
 *   delete:
 *     summary: Delete a like/dislike by ID
 *     tags: [LikeComment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the like/dislike to delete
 *     responses:
 *       200:
 *         description: Like/Dislike deleted successfully
 *       404:
 *         description: Like/Dislike not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', likeCommentController.deleteLikeComment);

module.exports = router;
