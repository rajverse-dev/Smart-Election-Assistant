const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.get('/booths', locationController.getNearbyBooths);

module.exports = router;
