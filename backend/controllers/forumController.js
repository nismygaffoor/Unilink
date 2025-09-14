const ForumPost = require('../models/ForumPost');

// Get all forum posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await ForumPost.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new forum post
exports.createPost = async (req, res) => {
  try {
    const post = new ForumPost({ ...req.body, replies: 0 });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
