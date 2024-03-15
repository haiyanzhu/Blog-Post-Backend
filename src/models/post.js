//Import Mongoose
const mongoose = require('mongoose');

//create a schema model;
const postSchema = new mongoose.Schema({
    title: {type:String, require: true},
    author: {type: String, require: true},
    description :{type: String, require: true},
    likes: {type: Number, require: true},
    comments: [{body: String}]    
});
const Post = new mongoose.model('Post', postSchema);
//Export the Post Model;
module.exports = Post;