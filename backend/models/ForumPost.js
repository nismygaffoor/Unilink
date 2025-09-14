const mongoose = require('mongoose');

const ForumPostSchema = new mongoose.Schema({
  author: { type: String, required: true }, // store Firebase UID
  content: { type: String, required: true },
  replies: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('ForumPost', ForumPostSchema);
