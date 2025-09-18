const express = require('express');
const router = express.Router();
const { getNotes, createNote } = require('../controllers/noteController');

// Get all notes
router.get('/', getNotes);

// Create a new note
router.post('/', createNote);

module.exports = router;
