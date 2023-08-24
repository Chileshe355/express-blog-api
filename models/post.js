const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  Title: { type: String, required: true },
  Body: { type: String, required: true },
  Author_id:{type:String, required: true},
  status: {
    type: String,
    required: true,
    enum: ["Published", "Unpublished"],
    default: "Unpublished",
  },
  Date: { type: Date },
});

PostSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/user/post/${this._id}`;
});
