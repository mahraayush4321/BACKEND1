const HTTP_STATUS = require('../helpers/http-status');
const Response = require('../helpers/response');
const Model = require('../Models/post');
class Posts {
    createNewPost = async (req,res) => {
        const {title,description,} = req.body;
        const { _id: userId} = req.user;
        try {
            const newPostToInsert = new Model({
                title,
                description,
                postedBy:userId
            });
            const savedPost = await newPostToInsert.save();
            const populatedPost = await Model.findById(savedPost._id).populate({path: 'postedBy', select: 'firstName lastName email'});
            Response.createSucessResponse(res,HTTP_STATUS.SUCCESS,{post: populatedPost});
        } catch (error) {
            console.error("Error creating new post:", error);
            Response.createInternalErrorResponse(res);
        }
    }
}
module.exports = new Posts();