const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  uploader: { type: String, required: true }, // Firebase UID
  link: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);
