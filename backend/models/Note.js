const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  unit: { type: String, required: true },
  description: { type: String },
  uploader: { type: String, required: true },
  date: { type: Date, default: Date.now },
  link: { type: String, required: true }
});

module.exports = mongoose.model('Note', noteSchema);
