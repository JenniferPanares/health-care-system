const Analytics = require('backend/models/analyticsModel');

// Record new analytics data
exports.recordAnalytics = async (req, res) => {
    try {
        const { type, data } = req.body;
        const analytics = new Analytics({ type, data });
        await analytics.save();
        res.status(201).json({ message: 'Analytics data recorded successfully', analytics });
    } catch (error) {
        res.status(500).json({ message: 'Failed to record analytics data', error: error.message });
    }
};

// Get all analytics data
exports.getAllAnalytics = async (req, res) => {
    try {
        const analyticsData = await Analytics.find();
        res.status(200).json(analyticsData);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch analytics data', error: error.message });
    }
};
