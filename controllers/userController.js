const User = require("../models/user");
const Post = require("../models/post");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { post } = require("../routes");
const { updateOne } = require("../models/comment");

//login

//logout

//get post (get all posts by a specific user)
exports.get_all_posts = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).exec();
  const posts = await Post.find({ Author: req.params.id });

  if (!posts) {
    const err = "the blog posts could not be found";
    res.json(err);
    return;
  }

  res.json(user, posts);
});

//get post (get specific post)
exports.specific_post = asyncHandler(async (req, res, next) => {
  //find specific post
  const post = await Post.findById(req.params.id).exec();
  //check to see if post exists
  if (!post) {
    const err = "either the post does not exist or has been removed";
    res.json(err);
    return;
  } else {
    res.json(post);
  }
});

//update post (update specific post)
exports.get_all_posts = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).exec();
  const post = await Post.findById(req.params.id).exec();
  if (!post) {
    const err = "either the post does not exist or has been removed";
    res.json(err);
    return;
  }
  //create new post object
  const updatedPost = new Post({
    Title: req.title,
    Body: req.body,
    Author_id: user.id,
    status: req.status,
    Date:  req.date,
    _id: post._id
  });
  // save changes to db
  await Post.findByIdAndUpdate(req.params.id, updatedPost);

  const ru = await Post.findById(req.params.id).exec();
  res.json( ru)
});


//create post (create a new post)
exports.get_all_posts = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id).exec();
  
//create new post object
    const post = new Post({
      Title: req.title,
      Body: req.body,
      Author_id: user.id,
      status: req.status,
      Date:  req.date,
      _id: post._id
    });

// save changes to db
     await post.save();
    res.json( post)
  });

//delete post (delete a specific post)

exports.delete_post = asyncHandler(async (req, res, next) => {
    // Get details of author and all their books (in parallel)
    const post = await Post.findById(req.params.id).exec()
  
    // Author has no books. Delete object and redirect to the list of authors.
    await post.findByIdAndRemove(req.body.authorid);
    res.json("successfully deleted");
    })
