const mongoose = require('mongoose');
const {Schema} = mongoose;
const sportsCategory = ['cricket','football', 'badminton','basketBall', 'volleyball', 'TableTennis', 'ArmWrestling', 'chess']

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
        required: false
    },
    postedBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    sports: {
        type:String,
        enum:sportsCategory,
        required:true
    },
    pincode: {
        type:Number,
        required:true
    }
},{timestamps:true,versionKey:false})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;