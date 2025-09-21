// routes/noteRoutes.js
const express = require('express');
const router = express.Router();
const {
  getNotes,
  createNote,
  getSubjects,
  getNotesBySubject
} = require('../controllers/noteController');

// Get all notes
router.get('/', getNotes);

// Create a new note
router.post('/', createNote);

// Get all subjects
router.get('/subjects', getSubjects);

// Get notes by subject
router.get('/:subject', getNotesBySubject);

module.exports = router;
