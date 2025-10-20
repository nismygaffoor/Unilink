const Note = require('../models/Note');
const User = require('../models/User');

exports.getNotesBySubject = async (req, res) => {
  try {
    const notes = await Note.find({ subject: req.params.subject }).lean();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { uid, email, name } = req.user; // from requireAuth middleware

    const note = await Note.create({
      subject: req.body.subject,
      unit: req.body.unit,
      description: req.body.description,
      filePath: req.file?.path,
      userId: uid,
      author: name || email || "Anonymous", // take from logged-in user
    });

    // increment user’s note counter
    await User.findByIdAndUpdate(uid, { $inc: { notes: 1 } });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
