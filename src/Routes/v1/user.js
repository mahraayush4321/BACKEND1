const express = require('express');
const router = express.Router();
const User = require('../../controllers/user');

router.post('/users', User.createNewUser);

module.exports = router;