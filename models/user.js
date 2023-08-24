const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Author_Name:{type:String, required:true},
    Email:{type:String, required:true},
    Password:{type:String, required:true}
});

UserSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/user/${this._id}`;
});

// Export model
module.exports = mongoose.model("Book", BookSchema);