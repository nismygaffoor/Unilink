const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  subject: { type: String, required: true },   // e.g. "Mathematics"
  course: { type: String, required: true },    // e.g. "BSc Computer Science"
  unit: { type: String, required: true },      // e.g. "Algebra I"
  description: { type: String },
  uploader: { type: String, required: true },
  link: { type: String, required: true }
}, { timestamps: true });


module.exports = mongoose.model('Note', NoteSchema);
