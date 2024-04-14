const express = require('express');
const router = express.Router();
const Post = require('../../controllers/post');
const authMiddleware = require('../../middleware/auth');
const upload = require('../../middleware/uploadMiddleware');

router.post('/post', authMiddleware, upload.single('file'), Post.createNewPost);
router.put('/updatePost/:postId', authMiddleware, Post.updatePost);
router.delete('/deletePost/:postId', authMiddleware, Post.deletePost);
router.get('/posts', authMiddleware, Post.getAllPostsByUser);
router.get('/posts/:postId', Post.getSinglePost);
router.get('/posts/category/:category', Post.getSportByCatergory);
router.get('/allpost', Post.getAllPost);
router.get('/bypin',Post.searchSportsByPincode)

//do not use: Route to delete all posts from database 
router.delete('/deletePosts', Post.deleteAllPost);

module.exports = router;