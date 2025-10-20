// backend/routes/auth.js
const express = require("express");
const { ensureProfile } = require("../controllers/authController");
const router = express.Router();

// POST /api/auth/ensureProfile
router.post("/ensureProfile", ensureProfile);

module.exports = router;
