const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin login route
router.post('/login', adminController.login);

// Example protected admin route
router.get('/dashboard', adminController.dashboard);

module.exports = router;
