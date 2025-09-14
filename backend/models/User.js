const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: { type: String }, // use Firebase UID as _id
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  points: { type: Number, default: 0 },
  badge: { type: String, default: '🎓 Newcomer' },
  notes: { type: Number, default: 0 },
  events: { type: Number, default: 0 },
  forumPosts: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
