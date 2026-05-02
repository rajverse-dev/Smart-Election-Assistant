const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/', chatController.handleChat);
router.get('/:sessionId', chatController.getHistory);

module.exports = router;
