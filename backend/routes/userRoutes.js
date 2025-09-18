const express = require('express');
const router = express.Router();
const { getLeaderboard, getProfile } = require('../controllers/userController');

// Leaderboard
router.get('/leaderboard', getLeaderboard);

// Get user profile by email
router.get('/:email', getProfile);

module.exports = router;
