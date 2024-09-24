const Subscription = require('../models/subscriptionModel');

// Create a new subscription
const createSubscription = async (req, res) => {
  try {
    const { subscriberID, subscribedToID } = req.body;

    // Check if the subscription already exists
    const existingSubscription = await Subscription.findOne({ subscriberID, subscribedToID });
    if (existingSubscription) {
      return res.status(400).json({ message: 'Subscription already exists.',success:false });
    }

    // Create a new Subscription instance
    const newSubscription = new Subscription({ subscriberID, subscribedToID });

    // Save the instance to the database
    await newSubscription.save();

    res.status(201).json({ message: 'subscription user successfully', success: true  });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false  });
  }
};

// Get all subscriptions for a specific user (who they are subscribed to)
const getSubscriptions = async (req, res) => {
  try {
    // Find all subscriptions for a specific subscriber
    
    const subscriptions = await Subscription.find({ subscriberID: req.params.subscriberID }).populate('subscribedToID');

    // Format the subscriptions and filter out 'Admin' roles
    const formattedSubscriptions = subscriptions
    .filter(user => user.subscribedToID && user.subscribedToID.role !== 'Admin')
    .map(user => ({
      userName: user.subscribedToID.userName,
      profilePicture: user.subscribedToID.profilePicture,
    }));

    // Send the formatted subscriptions in the response
    res.status(200).json(formattedSubscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};


// Unsubscribe by ID (remove a subscription)
const deleteSubscription = async (req, res) => {
  try {
    const { subscriberID, subscribedToID } = req.params;

    // Find and delete the subscription by ID
    const deletedSubscription = await Subscription.findOneAndDelete({subscriberID, subscribedToID});

    if (!deletedSubscription) {
      return res.status(404).json({ message: 'Subscription not found',success:false });
    }

    res.status(200).json({ message: 'Unsubscribed successfully' ,success:true});
  } catch (error) {
    res.status(500).json({ message: error.message ,success:false});
  }
};

const checkSubscription=async (req, res) => {
  try {
  const { subscriberID, subscribedToID } = req.params;
  const subscribe=await Subscription.find({subscriberID,subscribedToID})
  if(subscriberID===subscribedToID ){
    res.status(200).json({isSubscribe:'MyChannel'});
  }
  else if (subscribe.length>0) {
  res.status(200).json({isSubscribe:'Subscribed'});
  }else {
    res.status(200).json({isSubscribe:'Unsubscribed'});
  }
  } catch (error) {
    res.status(500).json({ message: error.message ,success:false});
  }

}
module.exports = {
  createSubscription,
  getSubscriptions,
  deleteSubscription,
  checkSubscription
};
