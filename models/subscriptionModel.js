const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const subscriptionSchema = new mongoose.Schema({
    subscriberID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    subscribedToID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
