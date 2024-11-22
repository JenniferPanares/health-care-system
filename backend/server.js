require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to the database
connectDB();

// Import routes
const authRoutes = require('./routes/authRoutes.js');


// Use routes
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // Export app for testing or other imports if needed
