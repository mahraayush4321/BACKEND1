const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
},{timestamps:true})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;