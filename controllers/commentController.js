const Post = require("../models/post");
const Comment = require("../models/comment");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const comment = require("../models/comment");



//get all comments for a post
exports.get_post_comments=  asyncHandler(async(req,res, next)=>{
    const comments =await Comment.find({post_id:req.params.id}).exec();

    if(comments.length>0){
        //found some comments
        res.json(comments)
        return
    }
    else{
        //none found
        res.json("no comments yet. be the first to share your thoughts")
    }
})

//create comment
exports.create_comment = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id).exec();
  
//create new post object
    const comment = new Comment({
        Author_Email:req.email,
        Author_Name:req.name,
        Body:req.body,
        post_id:post._id,
    });

// save changes to db
     await comment.save();
    res.json("created new comment successfully")
  });


