const Subscription = require('../models/subscriptionModel');

// Create a new subscription
const createSubscription = async (req, res) => {
  try {
    const { subscriberID, subscribedToID } = req.body;

    // Check if the subscription already exists
    const existingSubscription = await Subscription.findOne({ subscriberID, subscribedToID });
    if (existingSubscription) {
      return res.status(400).json({ message: 'Subscription already exists.' });
    }

    // Create a new Subscription instance
    const newSubscription = new Subscription({ subscriberID, subscribedToID });

    // Save the instance to the database
    const savedSubscription = await newSubscription.save();

    res.status(201).json(savedSubscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all subscriptions for a specific user (who they are subscribed to)
const getSubscriptions = async (req, res) => {
  try {
    const { subscriberID } = req.params;

    // Find all subscriptions for a specific subscriber
    const subscriptions = await Subscription.find({ subscriberID }).populate('subscribedToID');

    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unsubscribe by ID (remove a subscription)
const deleteSubscription = async (req, res) => {
  try {
    const { subscriberID, subscribedToID } = req.params;

    // Find and delete the subscription by ID
    const deletedSubscription = await Subscription.findByIdAndDelete(subscriberID, subscribedToID);

    if (!deletedSubscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    res.status(200).json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSubscription,
  getSubscriptions,
  deleteSubscription
};
