//Import the Express
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
//const { authMiddleware } = require("../middleware/authMiddleware")
const {
    createPost,
    getAllPosts, 
    getPost,
    updatePost,
    deletePost
} = require('../controllers/post');

//Create Routers, in the middleware, there is a next(), it will processing e.g. createPost 
router.post('/',  authMiddleware, createPost);
router.get('/', getAllPosts);
router.get('/:id', getPost);
router.patch('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);
module.exports = router;


