const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    videoUrl: {
        type: String,
        required: true
    },
    backImgVideoUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnailPath: {
        type: String,
        required: false,
    },
    views: {
        type: Number,  // Changed to Number for views
        required: false,
        default:0
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Video', videoSchema);
