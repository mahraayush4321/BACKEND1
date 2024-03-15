const express = require('express');
const router = express.Router();
const User = require('../../controllers/user');

router.post('/users', User.createNewUser);
router.post('/login', User.loginUser);
router.get('/Users', User.getAllUser);
router.get('/getUser/:userId', User.getSingleUser);

//do not use: Route to delete all users
router.delete('/deleteUsers', User.deleteAllUsers);

module.exports = router;