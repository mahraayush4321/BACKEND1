const express = require('express');
const router = express.Router();
const Post = require('../../controllers/post');
const authMiddleware = require('../../middleware/auth');

router.post('/post', authMiddleware, Post.createNewPost);

module.exports = router;