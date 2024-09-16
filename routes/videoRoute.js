const express = require('express');
const router = express.Router();
const { getVideos, getVideo, createVideo, updateVideo, deleteVideo, assignVideo } = require('../controllers/videoController');
const isAuth = require('../middleware/auth');

/**
 * @swagger
 * /api/video/videos/{userId}:
 *   get:
 *     summary: Returns the list of all Videos
 *     tags: [Video]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The list of videos
 */
router.get('/videos/:userId', getVideos);

/**
 * @swagger
 * /api/video/{videoId}:
 *   get:
 *     summary: Returns details of a specific Video
 *     tags: [Video]
 *     parameters:
 *       - name: videoId
 *         in: path
 *         required: true
 *         description: ID of the video to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns details of the video
 */
router.get('/:videoId', getVideo);

/**
 * @swagger
 * /api/video/{categoryId}:
 *   post:
 *     summary: Create a new Video
 *     tags: [Video]
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID of the category to create
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               videoUrl:
 *                 type: string
 *               description:
 *                 type: string
 *               backImgVideoUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Video created successfully
 */
router.post('/:categoryId', isAuth, createVideo);

/**
 * @swagger
 * /api/video/{videoId}:
 *   put:
 *     summary: Update an existing Video
 *     tags: [Video]
 *     parameters:
 *       - name: videoId
 *         in: path
 *         required: true
 *         description: ID of the video to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               videoUrl:
 *                 type: string
 *               backImgVideoUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Video updated successfully
 */
router.put('/:videoId', isAuth, updateVideo);

/**
 * @swagger
 * /api/video/{videoId}:
 *   delete:
 *     summary: Delete a Video
 *     tags: [Video]
 *     parameters:
 *       - name: videoId
 *         in: path
 *         required: true
 *         description: ID of the video to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Video deleted successfully
 */
router.delete('/:videoId', isAuth, deleteVideo);

/**
 * @swagger
 * /api/video/{playlistId}/{videoId}:
 *   delete:
 *     summary: assgin a Video to Playlist
 *     tags: [Video]
 *     parameters:
 *       - name: videoId
 *         in: path
 *         required: true
 *         description: ID of the video 
 *         schema:
 *           type: string
 *       - name: playlistId
 *         in: path
 *         required: true
 *         description: ID of the Playlist
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Video assign to playlist successfully
 */
router.post('/:playlistId/:videoId', isAuth, assignVideo);

module.exports = router;
