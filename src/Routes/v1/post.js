const express = require('express');
const router = express.Router();
const Post = require('../../controllers/post');
const authMiddleware = require('../../middleware/auth');

router.post('/post', authMiddleware, Post.createNewPost);
router.put('/updatePost/:postId', authMiddleware, Post.updatePost);
router.delete('/deletePost/:postId', authMiddleware, Post.deletePost);
router.get('/posts', authMiddleware, Post.getAllPostsByUser);
router.get('/posts/:postId', Post.getSinglePost);
router.get('/posts/category/:category', Post.getSportByCatergory);

//do not use: Route to delete all posts from database 
router.delete('/deletePosts', Post.deleteAllPost);

module.exports = router;