const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const isAuth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Like
 */

/**
 * @swagger
 * /api/like:
 *   post:
 *     summary: Like or dislike a video
 *     tags: [Like]
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
 *               videoId:
 *                 type: string
 *                 description: ID of the video being liked/disliked
 *     responses:
 *       201:
 *         description: Like/Dislike created successfully
 *       400:
 *         description: User has already liked/disliked this video
 *       500:
 *         description: Server error
 */
router.post('/', isAuth,likeController.createLike);

/**
 * @swagger
 * /api/like/{videoId}:
 *   get:
 *     summary: Get all likes/dislikes for a video
 *     tags: [Like]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the video
 *     responses:
 *       200:
 *         description: List of likes/dislikes
 *       500:
 *         description: Server error
 */
router.get('/:videoId',isAuth, likeController.getLikes);

/**
 * @swagger
 * /api/like/check/{videoId}:
 *   get:
 *     summary: Get  like/dislike for a video
 *     tags: [Like]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the video
 *     responses:
 *       200:
 *         description: check like/dislike of video
 *       500:
 *         description: Server error
 */
router.get('/check/:videoId',isAuth, likeController.checkLike);


/**
 * @swagger
 * /api/like/{id}:
 *   delete:
 *     summary: Delete a like/dislike by ID
 *     tags: [Like]
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
router.delete('/:id',isAuth, likeController.deleteLike);

module.exports = router;
