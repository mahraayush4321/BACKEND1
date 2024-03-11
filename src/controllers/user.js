const { JWT_SECRET } = require('../../config');
const HTTP_STATUS = require('../helpers/http-status');
const Response = require('../helpers/response');
const Model = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class User {
    createNewUser = async (req,res) => {
        const {firstName, lastName , email, password} = req.body;
        try {
            const hashedpassword = await bcrypt.hash(password,10);
            const newUserToInsert = new Model({
                firstName,
                lastName,
                email,
                password:hashedpassword,
            });
            const savedUser = await newUserToInsert.save();
            const payload = {
                userId: savedUser._id,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email,
            };
            const token = jwt.sign(payload,JWT_SECRET)
           Response.createSucessResponse(res,HTTP_STATUS.SUCCESS, {user:savedUser, token});
        } catch (error) {
            Response.createInternalErrorResponse(res,error);
        }
    }

    loginUser = async (req,res) => {
        const {email, password} = req.body;
        try {
            const user = await Model.findOne({email:email});
            if(!user) {
               return Response.createNotFoundResponse(res);
            }
            const passwordMatch = await bcrypt.compare(password,user.password) 

            if(!passwordMatch) {
               return Response.createUnauthorizedResponse(res);
            }

            const payload = {
                userId: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            };
            const token = jwt.sign(payload, JWT_SECRET);
           Response.createSucessResponse(res, HTTP_STATUS.SUCCESS, { user, token });
        } catch (error) {
            Response.createInternalErrorResponse(res, error);
        }
    }
}

module.exports = new User();