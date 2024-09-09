const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        enum: ['User', 'Admin'],
        default: 'User',
    },
    userName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    country: {
        type: String,
        required: true
    },
    updatedAt: {
        type: String,
        required: false
    },
    verified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
