const { searchVideo, searchPlaylists, searchUsers } = require("../controllers/searchControllers");
const isAuth = require("../middleware/auth");
const express = require('express');
const router = express.Router();


/**
 * @swagger
 * /api/search/{content}:
 *   get:
 *     tags: [Search]
 *     parameters:
 *       - in: path
 *         name: content
 *         schema:
 *           type: string
 *         required: true
 *         description: The search keyword to filter video titles
 *     responses:
 *       200:
 *         description: Returns search of the videos
 */
router.get('/:content',isAuth, searchVideo);

/**
 * @swagger
 * /api/search/users/{content}:
 *   get:
 *     tags: [Search]
 *     parameters:
 *       - in: path
 *         name: content
 *         schema:
 *           type: string
 *         required: true
 *         description: The search keyword to filter video titles
 *     responses:
 *       200:
 *         description: Returns search of the videos
 */
router.get('/users/:content',isAuth, searchUsers);

/**
 * @swagger
 * /api/search/playlists/{content}:
 *   get:
 *     tags: [Search]
 *     parameters:
 *       - in: path
 *         name: content
 *         schema:
 *           type: string
 *         required: true
 *         description: The search keyword to filter video titles
 *     responses:
 *       200:
 *         description: Returns search of the videos
 */
router.get('/playlists/:content',isAuth, searchPlaylists);

module.exports = router;
