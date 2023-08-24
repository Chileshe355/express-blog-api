const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    Author_Email:{type:String,required:true},
    Author_Name:{type:String,required:true},
    Body:{type:String,required:true},
    post_id:{ type: Schema.Types.ObjectId, ref: "Post", required: true },
})


// Virtual for author's URL
CommentSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/api/post/${this.post_id}/comment/${this._id}`;
  });

// Export model
module.exports = mongoose.model("Comment", CommentSchema);