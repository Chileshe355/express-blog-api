const Post = require("../models/post");
const Comment = require("../models/comment");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");


//get post (get all posts)
exports.all_posts=asyncHandler(async(req,res,next)=>{
    const posts= await Post.find().exec();
    res.json(posts);
})

//get post (get specific post)
exports.specific_post=asyncHandler(async(req,res,next)=>{
    //find specific post 
    const post= await Post.findById(req.params.id).exec();
    //check to see if post exists
    if(!post){
        res.json("either the post does not exist or has been removed")
        return
    }
    else{
        res.json(post)
    }
    

})




