const express = require("express"),
	  mongoose = require("mongoose"),
	  router = express.Router({mergeParams:true});

// MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
	title: String,
	image: String, // {type: String, default: <imgURl>} to set a default image
	body: String,
	created: {type: Date, default: Date.now}
});
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;