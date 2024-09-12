const express = require('express');
const router = express.Router();
const { getUsers, getUser, updateUser, deleteUser, getCounts } = require('../controllers/userController');
const isAuth = require('../middleware/auth');

/**
 * @swagger
 * /api/user/:
 *   get:
 *     summary: Returns the list of all Users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of users
 */
router.get('/',isAuth, getUsers);

/**
 * @swagger
 * /api/user/current-user:
 *   get:
 *     summary: Returns details of a specific User
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Returns details of the user
 */
router.get('/current-user',isAuth, getUser);

/**
 * @swagger
 * /api/user/Counts:
 *   get:
 *     summary: Returns count of User and Video and Playlist
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Returns count of User and Video and Playlist
 */
router.get('/counts',isAuth, getCounts);

/**
 * @swagger
 * /api/user/{userId}:
 *   put:
 *     summary: Update an existing User
 *     tags: [User]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               profilePicture:
 *                 type: string
 *               backgroundUser:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put('/:userId', isAuth, updateUser);

/**
 * @swagger
 * /api/user/{userId}:
 *   delete:
 *     summary: Delete a User
 *     tags: [User]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete('/:userId', isAuth, deleteUser);

module.exports = router;
