const express = require('express');
const router = express.Router();
const multer = require('multer');
const requireAuth = require('../middleware/requireAuth');
const { getNotesBySubject, createNote } = require('../controllers/noteController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// Public route: view notes
router.get('/subject/:subject', getNotesBySubject);

// Protected route: upload notes
router.post('/', requireAuth, upload.single('file'), createNote);

module.exports = router;
