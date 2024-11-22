const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Analytics', analyticsSchema);
