const HTTP_STATUS = require('../helpers/http-status');
const Response = require('../helpers/response');
const Model = require('../Models/post');
class Posts {
    createNewPost = async (req,res) => {
        const {title,description,} = req.body;
        try {
            const newPostToInsert = new Model({
                title,
                description,
            });
            const savedPost = await newPostToInsert.save();
            Response.createSucessResponse(res,HTTP_STATUS.SUCCESS,{post: savedPost});
        } catch (error) {
            Response.createInternalErrorResponse(res,error);
        }
    }
}
module.exports = new Posts();