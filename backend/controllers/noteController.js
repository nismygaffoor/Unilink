// controllers/noteController.js
const Note = require('../models/Note');

// Get all notes
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new note
exports.createNote = async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get unique subjects with course
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Note.aggregate([
      { $group: { _id: { subject: "$subject", course: "$course" } } },
      { $project: { subject: "$_id.subject", course: "$_id.course", _id: 0 } },
    ]);
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get notes by subject
exports.getNotesBySubject = async (req, res) => {
  try {
    const notes = await Note.find({ subject: req.params.subject });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
