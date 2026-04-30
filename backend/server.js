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

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smart-election')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Basic route
app.get('/', (req, res) => {
  res.send('Smart Election Assistant API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
