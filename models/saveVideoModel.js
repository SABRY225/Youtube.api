const mongoose = require('mongoose');

const saveVideoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        require:true

    },
}, {
    timestamps: true
});

module.exports = mongoose.model('SaveVideo', saveVideoSchema);
