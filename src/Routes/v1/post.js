const express = require('express');
const router = express.Router();
const Post = require('../../controllers/post');

router.post('/post',  Post.createNewPost);

module.exports = router;