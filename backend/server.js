const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/timeline', require('./routes/timelineRoutes'));
app.use('/api/location', require('./routes/locationRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smart-election')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error: ', err));

const path = require('path');

// Basic route (Remove this later if it conflicts with frontend)
app.get('/api', (req, res) => {
  res.send('Smart Election Assistant API is running...');
});

// Serve static frontend in production
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route to serve React app for non-API requests
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Cloud Run requires listening on port 8080 or PORT env var
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
