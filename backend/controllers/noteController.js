const Note = require('../models/Note');

// Get notes by subject
exports.getNotesBySubject = async (req, res) => {
  try {
    const subject = req.params.subject;
    const notes = await Note.find({ subject });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create/upload a note
exports.createNote = async (req, res) => {
  try {
    const { subject, unit, description, uploader } = req.body;

    if (!req.file) return res.status(400).json({ error: "File is required" });

    const filePath = `/uploads/${req.file.filename}`; // adjust path

    const note = new Note({
      subject,
      unit,
      description,
      uploader,
      link: filePath
    });

    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
