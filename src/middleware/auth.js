const jwt = require('jsonwebtoken');
const User = require('../Models/user');
const JWT_SECRET = process.env.JWT_SECRET;
module.exports = async function authMiddleware (req,res,next) {

    const token = req.headers.authorization;

    if(!token) {
       return res.status(401).json({error: 'token was not found'});
    }

    try {
        const decoded = jwt.verify(token,JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
};