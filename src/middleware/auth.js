const User = require('../Models/user');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');

module.exports = async function authMiddleware (req,res,next) {

    const token = req.headers.authorization;
    if(!token) {
       return res.status(401).json({error: 'token was not found'});
    }
    try {
        const tokenWithoutPrefix = token.replace('Bearer ', '')
        const decoded =  jwt.verify(tokenWithoutPrefix,JWT_SECRET);
        console.log('Decoded Token:', decoded);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.token = tokenWithoutPrefix;
        req.user = user;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
};