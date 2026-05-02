const express = require('express');
const router = express.Router();
const timelineController = require('../controllers/timelineController');

router.get('/', (req, res, next) => {
  // Cache the timeline for 1 hour as it changes rarely
  res.set('Cache-Control', 'public, max-age=3600');
  next();
}, timelineController.getTimeline);

module.exports = router;
