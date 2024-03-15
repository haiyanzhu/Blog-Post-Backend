//Creating a Create Post Controller
const Post = require('../models/post');

//创建post成功后返回状态；
//Post 是一个model, model.create()包含以下的内容；
// 数据验证： Mongoose 会根据模型的定义对传入的数据进行验证，确保它们符合模型的 schema（模式）定义。

// 创建文档： 一旦数据通过验证，Mongoose 将使用提供的数据在 MongoDB 中创建一个新的文档。

// 保存文档到数据库： 新创建的文档将被保存到数据库中。
const createPost = async(req, res) => {
    //Destructuring the body of req, for better readability, we destrucuring the body as an object, then use the object inside the Post.create() 
    //const { title, author, description, likes, comments } = req.body;
    try {
        const post = await Post.create(req.body);
        // const post = await Post.create({
        //     title,
        //     author,
        //     description,
        //     likes,
        //     comments
        // });
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

//Get all the post /R of CRUD, result stored inside res;
const getAllPosts = async(req, res) =>{
    try {
        const posts = await Post.find();
        res.status(200).json({
            count: posts.length,
            posts,
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

};

//Get a single post by Id;
const getPost = async(req, res) => {
    const {id} = req.params;
    try {
         const post = await Post.findById({ _id: id });
         if (!post) {
            res.status(404).json({ error: "No post found." });
         } else {
            res.status(200).json(post);
         }
            
         
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
 
 }

 //Update a post /U of CRUD
 const updatePost = async(req, res) => {
    const {id} = req.params;
    try {
        const post = await Post.findByIdAndUpdate(
            {_id: id},
            { ...req.body },
            { new: true, runValidators: true}
        );
        if (!post) {
            return res.status(404).json({
                error: "No matching post found!"
            });
        };
        //if we want to given back the feedback about the new product instead of old one, we should use findById again;
        const updatedPost = await Post.findById(id);
        res.status(200).json({
            message: "The Post has been successfully updated.",
            post,
            updatedPost
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//Delete a post /D of CRUD
const deletePost = async(req, res) => {
    const {id} = req.params;
    try {
        const post = await Post.findByIdAndDelete({ _id: id });
        if (!post) {
            return res.status(404).json({
                error: "No matching post found!"
            });
        };
        res.status(200).json({
            message: "The Post has been successfully deleted.",
            post
        });
    }   catch(error){
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPost,
    updatePost,
    deletePost
};
