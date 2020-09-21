
const express = require("express"),
	  router = express.Router(),
	  Blog = require("../models/blog");


// Blog ROUTES

// INDEX ROUTE - GET REQUEST SHOWS ALL BLOGS
router.get('/', (req, res) => {
	Blog.find({}, (err, blogs) => {
		if(err){
			console.error("ERROR", err.message);
		}
		else {
			console.log(blogs);
			res.render("index", {blogs: blogs});
		}
	});
	
});

// NEW ROUTE - ADD ROUTE TO FORM FOR NEW BLOG
router.get("/blogs/new", (req, res) => {
	res.render("blogs/new");
});

// CREATE ROUTE - ADD NEW BLOG TO DATABASE
router.post("/blogs", (req, res) => {
	//create blog
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, (err, newBlog) => {
		if(err){
			console.error(err.message);
			res.render("new");
		}
		else {
			//then,redirect to index
			res.redirect("/blogs");
		}
	});
});

// SHOW ROUTE - Display more info on particular item
router.get("/blogs/:id", (req, res) => {
	Blog.findById(req.params.id, (err, foundBlog) => {
		if(err){
			console.error(err.message);
			res.redirect("/blogs"); 
			//res.send(err);
		}
		else {
			res.render("blogs/show", {blog: foundBlog});
		}
	})
});

// EDIT ROUTE
router.get("/blogs/:id/edit", (req, res) => {
	Blog.findById(req.params.id, (err, foundBlog) => {
		if(err){
			res.redirect("/blogs")
		}
		else {
			res.render("blogs/edit", {blog: foundBlog});
		}
	})
});

// UPDATE ROUTE
router.put("/blogs/:id", (req, res)=> {
	req.body.blog.body = req.sanitize(req.body.blog.body)
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
		if(err){
			res.redirect('/blogs');
		}
		else {
			res.redirect('/blogs/' + req.params.id);
		}
	});
});

// DESTROY ROUTE
router.delete('/blogs/:id', (req, res) => {
	// Destroy blog
	Blog.findByIdAndRemove(req.params.id, (err) => {
		if(err){
			console.error(err.message);
		}
		else {
			// redirect
			res.redirect('/blogs');
		}
	})
	
});

module.exports = router;