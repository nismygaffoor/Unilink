const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getNotesBySubject, createNote } = require('../controllers/noteController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.get('/subject/:subject', getNotesBySubject);
router.post('/', upload.single('file'), createNote);

module.exports = router;
