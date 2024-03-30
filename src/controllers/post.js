const HTTP_STATUS = require('../helpers/http-status');
const Response = require('../helpers/response');
const Model = require('../Models/post');
const upload = require('../middleware/uploadMiddleware');
class Posts {
    createNewPost = async (req, res) => {
        const { title, description,sports,pincode } = req.body;
        const { _id: userId } = req.user;
        try {
            const newPostToInsert = new Model({
                title,
                description,
                sports,
                pincode,
                postedBy: userId,
            });
            const savedPost = await newPostToInsert.save();
            const populatedPost = await Model.findById(savedPost._id).populate({ path: 'postedBy', select: 'firstName lastName email' });
            Response.createSucessResponse(res, HTTP_STATUS.SUCCESS, { post: populatedPost });
        } catch (error) {
            console.error("Error creating new post:", error);
            Response.createInternalErrorResponse(res);
        }
    }

    updatePost = async (req, res) => {
        const { title, description } = req.body;
        const { postId } = req.params;
        try {
            const post = await Model.findByIdAndUpdate(postId, {
                $set: { title, description },
            }, { new: true }
            );
            const userId = req.user._id.toString();
            if (post.postedBy.toString() !== userId) {
                return Response.createForbiddenResponse(res);
            }
            Response.createSucessResponse(res, HTTP_STATUS.SUCCESS, post);
        } catch (error) {
            Response.createInternalErrorResponse(res);
        }
    }

    deletePost = async (req, res) => {
        const { postId } = req.params;
        const post = await Model.findById(postId);
        try {
            if (!post) {
                return Response.createNotFoundResponse(res, 'no post to delete');
            }
            const userId = req.user._id.toString();
            if (post.postedBy.toString() !== userId) {
                return Response.createForbiddenResponse(res, "You are not authorized to delete this post");
            }
            await Model.findByIdAndDelete(postId);
            Response.createSucessResponse(res, HTTP_STATUS.SUCCESS, { message: "Post deleted successfully" });
        } catch (error) {
            Response.createInternalErrorResponse(res);
        }
    }

    getAllPostsByUser = async (req,res) => {
        const {_id:userId} = req.user;
        try {
            const posts = await Model.find({ postedBy: userId }).populate({path: 'postedBy', select: 'firstName lastName email'}).sort({createdAt: -1});
            Response.createSucessResponse(res, HTTP_STATUS.SUCCESS, { posts });
        } catch (error) {
            Response.createInternalErrorResponse(res);
        }
    }

    getSinglePost = async (req,res) => {
        const {postId} = req.params;
        try {
            const post = await Model.findById(postId).populate({path: 'postedBy', select: 'firstName lastName email'})

            if (!post) {
                Response.createNotFoundResponse(res, 'Post not found');
            }
            Response.createSucessResponse(res, HTTP_STATUS.SUCCESS, { post });
        } catch (error) {
            Response.createInternalErrorResponse(res);
        }
    }

    deleteAllPost = async (req, res) => {
        try {
            await Model.deleteMany({});
            Response.createSucessResponse(res, HTTP_STATUS.SUCCESS, { message: "All posts deleted successfully" });
        } catch (error) {
            Response.createInternalErrorResponse(res);
        }
    }

    getSportByCatergory = async (req,res) => {
        const {category} = req.params;
        try {
            const CategoryPost = await Model.find({sports:category}).populate({path: 'postedBy', select: 'firstName lastName email'})
            Response.createSucessResponse(res, HTTP_STATUS.SUCCESS, { posts: CategoryPost });
        } catch (error) {
            console.error("Error fetching posts by category:", error);
            Response.createInternalErrorResponse(res); 
        }
    }

    getAllPost = async(req, res) => {
        try {
           const allPost =  await Model.find({}).populate({path: 'postedBy', select: 'firstName lastName email'}).sort({createdAt:-1})
           const totalDocs = await Model.countDocuments();
           Response.createSucessResponse(res,HTTP_STATUS.SUCCESS, {totalDocs, allPosts: allPost });
        } catch (error) {
            console.error("Error fetching posts by category:", error);
            Response.createInternalErrorResponse(res); 
        }
    }
}
module.exports = new Posts();