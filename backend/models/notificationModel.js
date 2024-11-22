const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    recipient: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Sent', 'Pending', 'Failed'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notification', notificationSchema);
