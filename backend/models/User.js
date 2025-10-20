// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: { type: String },                // Firebase UID as primary key
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["student", "admin"], default: "student" },
  points: { type: Number, default: 0 },
  badge: { type: String, default: '🎓 Newcomer' },
  notes: { type: Number, default: 0 },
  events: { type: Number, default: 0 },
  forumPosts: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
