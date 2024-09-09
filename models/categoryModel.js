const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require:true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
