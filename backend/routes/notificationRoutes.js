const express = require('express');
const router = express.Router();

// Simulate a list of notifications (could be replaced with a database query)
const notifications = [
    { id: 1, message: 'New appointment scheduled', type: 'info', timestamp: new Date() },
    { id: 2, message: 'Inventory item running low', type: 'warning', timestamp: new Date() },
    { id: 3, message: 'Appointment cancelled', type: 'alert', timestamp: new Date() },
];

// Get all notifications
router.get('/', (req, res) => {
    try {
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
});

// Add a new notification
router.post('/', (req, res) => {
    try {
        const { message, type } = req.body;
        if (!message || !type) {
            return res.status(400).json({ message: 'Message and type are required' });
        }

        const newNotification = {
            id: notifications.length + 1,
            message,
            type,
            timestamp: new Date(),
        };
        notifications.push(newNotification);
        res.status(201).json({ message: 'Notification added successfully', newNotification });
    } catch (error) {
        res.status(500).json({ message: 'Error adding notification', error });
    }
});

module.exports = router;
