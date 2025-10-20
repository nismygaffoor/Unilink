// backend/routes/forumRoutes.js (or routes/community.js)
const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  listPosts,
  createPost,
  addComment,
  likePost,
  updatePost,
  deletePost,
} = require("../controllers/forumController");

const router = express.Router();

// Public read
router.get("/", listPosts);

// Auth required for write actions
router.post("/", requireAuth, createPost);
router.post("/:id/comments", requireAuth, addComment);
router.post("/:id/like", requireAuth, likePost);
router.put("/:id", requireAuth, updatePost);
router.delete("/:id", requireAuth, deletePost);

module.exports = router;
