const express = require("express"),
	  mongoose = require("mongoose");
      
// Comment Model/Schema      
 const commentSchema = new mongoose.Schema({
     text   : String,
     author : String,
     created: {type: Date, default: Date.now}
 });
 
 const Comment = mongoose.model("Comment", commentSchema);
 module.exports = Comment;