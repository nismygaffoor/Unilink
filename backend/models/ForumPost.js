// backend/models/ForumPost.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    author: { type: String, trim: true, default: "User" },
    content: { type: String, required: true, trim: true },
  },
  { _id: false, timestamps: { createdAt: true, updatedAt: false } }
);

const forumPostSchema = new mongoose.Schema(
  {
    userId: { type: String, index: true }, // Firebase UID
    author: { type: String, trim: true, default: "Anonymous" },
    content: { type: String, required: true, trim: true },
    likes: { type: Number, default: 0, min: 0 },
    comments: { type: [commentSchema], default: [] },
  },
  { timestamps: true, versionKey: false }
);

forumPostSchema.index({ createdAt: -1 });

module.exports = mongoose.model("ForumPost", forumPostSchema);
