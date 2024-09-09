const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

/**
 * @swagger
 * tags:
 *   name: Subscription
 */

/**
 * @swagger
 * /api/subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     tags: [Subscription]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subscriberID:
 *                 type: string
 *                 description: ID of the subscriber
 *               subscribedToID:
 *                 type: string
 *                 description: ID of the user being subscribed to
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *       400:
 *         description: Subscription already exists
 *       500:
 *         description: Server error
 */
router.post('/', subscriptionController.createSubscription);

/**
 * @swagger
 * /api/subscriptions/{subscriberID}:
 *   get:
 *     summary: Get all subscriptions for a user
 *     tags: [Subscription]
 *     parameters:
 *       - in: path
 *         name: subscriberID
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the subscriber
 *     responses:
 *       200:
 *         description: List of subscriptions
 *       500:
 *         description: Server error
 */
router.get('/:subscriberID', subscriptionController.getSubscriptions);

/**
 * @swagger
 * /api/subscriptions/{subscriberID}/{subscribedToID}:
 *   delete:
 *     summary: Unsubscribe (delete a subscription)
 *     tags: [Subscription]
 *     parameters:
 *       - in: path
 *         name: subscriberID
 *         required: true
 *         schema:
 *           type: string
 *           description: Subscription subscriberID to delete
 *       - in: path
 *         name: subscribedToID
 *         required: true
 *         schema:
 *           type: string
 *           description: Subscription subscribedToID to delete
 *     responses:
 *       200:
 *         description: Unsubscribed successfully
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Server error
 */
router.delete('/:subscriberID/:subscribedToID', subscriptionController.deleteSubscription);

module.exports = router;
