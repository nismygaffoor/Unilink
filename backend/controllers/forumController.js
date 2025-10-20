// backend/controllers/forumController.js
const ForumPost = require("../models/ForumPost");

// GET /api/forum
exports.listPosts = async (_req, res) => {
  try {
    const posts = await ForumPost.find().sort({ createdAt: -1 }).lean();
    res.json(posts); // simpler: return array directly
  } catch (err) {
    console.error("listPosts:", err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

// POST /api/forum  (requireAuth)
exports.createPost = async (req, res) => {
  try {
    const content = (req.body.content || "").trim();
    if (!content) return res.status(400).json({ error: "Content is required" });

    // set by requireAuth
    const { uid, email, name } = req.user;
    const derivedAuthor = name || (email ? email.split("@")[0] : "") || "Anonymous";

    const post = await ForumPost.create({
      userId: uid,
      author: derivedAuthor,
      content,
    });

    res.status(201).json(post);
  } catch (err) {
    console.error("createPost:", err);
    res.status(400).json({ error: "Failed to create post" });
  }
};

// POST /api/forum/:id/comments  (requireAuth)
exports.addComment = async (req, res) => {
  try {
    const content = (req.body.content || "").trim();
    if (!content) return res.status(400).json({ error: "Content is required" });

    const { email, name } = req.user;
    const derivedAuthor = name || (email ? email.split("@")[0] : "") || "User";

    const post = await ForumPost.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    post.comments.push({ author: derivedAuthor, content });
    await post.save();

    res.json(post);
  } catch (err) {
    console.error("addComment:", err);
    res.status(400).json({ error: "Failed to add comment" });
  }
};

// POST /api/forum/:id/like  (requireAuth)
exports.likePost = async (req, res) => {
  try {
    const updated = await ForumPost.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Post not found" });
    res.json(updated);
  } catch (err) {
    console.error("likePost:", err);
    res.status(400).json({ error: "Failed to like post" });
  }
};

// PUT /api/forum/:id  (optional; requireAuth)
exports.updatePost = async (req, res) => {
  try {
    const updates = {};
    if (typeof req.body.content === "string") {
      const c = req.body.content.trim();
      if (!c) return res.status(400).json({ error: "Content cannot be empty" });
      updates.content = c;
    }
    const updated = await ForumPost.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Post not found" });
    res.json(updated);
  } catch (err) {
    console.error("updatePost:", err);
    res.status(400).json({ error: "Failed to update post" });
  }
};

// DELETE /api/forum/:id  (optional; requireAuth)
exports.deletePost = async (req, res) => {
  try {
    const deleted = await ForumPost.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("deletePost:", err);
    res.status(500).json({ error: "Failed to delete post" });
  }
};
