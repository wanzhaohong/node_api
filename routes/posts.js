const { request, response } = require('express');
const express = require('express');
const {auth} = require('../validation/verifytoken');

const router = express.Router();

const Post = require('../models/Post');

/* ************************************************ */

//Get All of the Posts
router.get('/', auth, async (request, response) => {
    try{
        const posts = await Post.find();
        response.json(posts);
    }catch(err){
        response.json({ message: err });
    }
});

router.get('/specific', (request, response) => {
    response.send("Specific Posts Page");
});

// Submit a Post
router.post('/', async (request, response) =>{
    const post = new Post({
        title: request.body.title,
        description: request.body.description
    });

    try{
        const savePost = await post.save();
        response.json(savePost);
    }catch(err){
        response.json({ message: err });
    }
});


// Get speicifc post
router.get('/:postId', async (request, response) => {
    try{
        const post = await Post.findById(request.params.postId);
        response.json(post);
    }catch(err){
        response.json({message: err});
    }
});


//Delete Post
router.delete('/:postId', async (request, response) => {
    try {
        const removedPost = await Post.remove({ _id: request.params.postId });
        response.json(removedPost);
    } catch (err) {
        response.json({ message: err });
    }
});

// Update a post
router.patch('/:postId', async (request, response) => {
    try {
        const patchPost = await Post.updateOne(
            { _id: request.params.postId }, 
            {$set: {title: request.body.title}}
            );
        response.json(patchPost);
    } catch (err) {
        response.json({ message: err });
    }
})


module.exports = router;