const express = require('express');
const router = express.Router();
const { getPlaylists, getPlaylist, createPlaylist, updatePlaylist, deletePlaylist, getPlaylistsByImgVideo } = require('../controllers/playlistController');
const isAuth = require('../middleware/auth');

/**
 * @swagger
 * /api/playlist/:
 *   get:
 *     summary: Returns the list of all Playlists
 *     tags: [Playlist]
 *     responses:
 *       200:
 *         description: The list of playlists
 */
router.get('/', isAuth,getPlaylists);

/**
 * @swagger
 * /api/playlist/playlistsByImgVideo/{userId}:
 *   get:
 *     summary: Returns the list of all playlistsByImgVideo
 *     tags: [Playlist]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The list of playlists
 */
router.get('/playlistsByImgVideo/:userId', isAuth,getPlaylistsByImgVideo);

/**
 * @swagger
 * /api/playlist/{playlistId}:
 *   get:
 *     summary: Returns details of a specific Playlist
 *     tags: [Playlist]
 *     parameters:
 *       - name: playlistId
 *         in: path
 *         required: true
 *         description: ID of the playlist to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns details of the playlist
 */
router.get('/:playlistId', isAuth,getPlaylist);

/**
 * @swagger
 * /api/playlist/:
 *   post:
 *     summary: Create a new Playlist
 *     tags: [Playlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Playlist created successfully
 */
router.post('/', isAuth, createPlaylist);

/**
 * @swagger
 * /api/playlist/{playlistId}:
 *   put:
 *     summary: Update an existing Playlist
 *     tags: [Playlist]
 *     parameters:
 *       - name: playlistId
 *         in: path
 *         required: true
 *         description: ID of the playlist to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               videosId:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Playlist updated successfully
 */
router.put('/:playlistId', isAuth, updatePlaylist);

/**
 * @swagger
 * /api/playlist/{playlistId}:
 *   delete:
 *     summary: Delete a Playlist
 *     tags: [Playlist]
 *     parameters:
 *       - name: playlistId
 *         in: path
 *         required: true
 *         description: ID of the playlist to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Playlist deleted successfully
 */
router.delete('/:playlistId', isAuth, deletePlaylist);

module.exports = router;
