const express = require('express');
const router = express.Router();
const { getPosts, createPost } = require('../controllers/forumController');

// Get all forum posts
router.get('/', getPosts);

// Create a new forum post
router.post('/', createPost);

module.exports = router;
