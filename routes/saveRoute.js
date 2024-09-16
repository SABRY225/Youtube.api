const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/auth');
const { getSaveVideos, getSavePlaylists, savePlaylist, deleteSavePlaylist, saveVideo, deleteSaveVideo } = require('../controllers/saveController');

/**
 * @swagger
 * /api/save/videos:
 *   get:
 *     summary: Returns the list of saved videos
 *     tags: [Save]
 *     responses:
 *       200:
 *         description: The list of saved videos
 */
router.get('/videos', isAuth, getSaveVideos);

/**
 * @swagger
 * /api/save/playlists:
 *   get:
 *     summary: Returns the list of saved playlists
 *     tags: [Save]
 *     responses:
 *       200:
 *         description: The list of saved playlists
 */
router.get('/playlists', isAuth, getSavePlaylists);

/**
 * @swagger
 * /api/save/playlist/{playlistId}:
 *   post:
 *     summary: Save a playlist
 *     tags: [Save]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *     responses:
 *       200:
 *         description: Playlist saved
 */
router.post('/playlist/:playlistId', isAuth, savePlaylist);

/**
 * @swagger
 * /api/save/playlist/{playlistId}:
 *   delete:
 *     summary: Remove a saved playlist
 *     tags: [Save]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *     responses:
 *       200:
 *         description: Playlist removed
 */
router.delete('/playlist/:playlistId', isAuth, deleteSavePlaylist);

/**
 * @swagger
 * /api/save/video/{videoId}:
 *   post:
 *     summary: Save a video
 *     tags: [Save]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *     responses:
 *       200:
 *         description: Video saved
 */
router.post('/video/:videoId', isAuth, saveVideo);

/**
 * @swagger
 * /api/save/video/{videoId}:
 *   delete:
 *     summary: Remove a saved video
 *     tags: [Save]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *     responses:
 *       200:
 *         description: Video removed
 */
router.delete('/video/:videoId', isAuth, deleteSaveVideo);

module.exports = router;
