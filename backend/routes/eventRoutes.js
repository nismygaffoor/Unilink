const express = require('express');
const router = express.Router();
const { getEvents, createEvent } = require('../controllers/eventController');

// Get all events
router.get('/', getEvents);

// Create a new event
router.post('/', createEvent);

module.exports = router;
