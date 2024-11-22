const Notification = require('backend/models/notificationModel.js');

// Send a new notification
exports.sendNotification = async (req, res) => {
    try {
        const { message, recipient } = req.body;
        const notification = new Notification({ message, recipient });
        await notification.save();
        // Simulate sending notification (e.g., send email/SMS)
        notification.status = 'Sent';
        await notification.save();
        res.status(201).json({ message: 'Notification sent successfully', notification });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send notification', error: error.message });
    }
};

// Get all notifications
exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch notifications', error: error.message });
    }
};
