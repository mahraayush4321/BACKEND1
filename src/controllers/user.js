const HTTP_STATUS = require('../helpers/http-status');
const Response = require('../helpers/response');
const Model = require('../Models/user');

class User {
    createNewUser = async (req,res) => {
        const {firstName, lastName , email, password} = req.body;
        const newUserToInsert = new Model({
            firstName,
            lastName,
            email,
            password,
        });
        try {
            const savedUser = await newUserToInsert.save();
            Response.createSucessResponse(res,HTTP_STATUS.SUCCESS, savedUser);
        } catch (error) {
            Response.createInternalErrorResponse(res,error);
        }
    }
}

module.exports = new User();