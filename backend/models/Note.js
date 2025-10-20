

// backend/models/Note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  subject:   { type: String, required: true },
  unit:      { type: String, required: true },
  description: { type: String },

  // 👇 added / renamed fields to match your controller
  userId:    { type: String, index: true },        // Firebase UID
  author:    { type: String, default: "Anonymous" }, // display name or email
  filePath:  { type: String, required: true },     // multer saves path here

  // Optional auto-timestamps will give you createdAt/updatedAt
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
