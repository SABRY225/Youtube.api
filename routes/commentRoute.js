const express = require('express');
const router = express.Router();
const { getComments, getComment, createComment, editComment, deleteComment } = require('../controllers/commentController');
const isAuth = require('../middleware/auth');

/**
 * @swagger
 * /api/comment/{videoId}:
 *   get:
 *     summary: Returns the list of all Comments
 *     tags: [Comment]
 *     parameters:
 *       - name: videoId
 *         in: path
 *         required: true
 *         description: ID of the business to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The list of categories
 */
router.get('/:videoId', isAuth,getComments);

/**
 * @swagger
 * /api/comments/{commentId}:
 *   get:
 *     summary: Returns detailes of Comment
 *     tags: [Comment]
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: ID of the business to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns detailes of Category
 */
router.get('/:commentId',isAuth, getComment);

/**
 * @swagger
 * /api/comment/{videoId}:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comment]
 *     parameters:
 *       - name: videoId
 *         in: path
 *         required: true
 *         description: ID of the business to retrieve
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created successfully
 */
router.post('/:videoId', isAuth,createComment);

/**
 * @swagger
 * /api/comment/{commentId}:
 *   put:
 *     summary: edit category
 *     tags: [Comment]
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: ID of the business to retrieve
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category edit successfully
 */
router.put('/:commentId', isAuth,editComment);

/**
 * @swagger
 * /api/comment/{commentId}:
 *   delete:
 *     summary: delete category
 *     tags: [Comment]
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: ID of the business to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Category delete successfully
 */
router.delete('/:commentId', isAuth,deleteComment);

module.exports = router;
