// Blog ROUTES
////////////////////////////////////////
// ROOT PAGE REDIRECTS TO INDEX PAGE
app.get("/", function(req, res){
	res.redirect("/blogs");
});

// INDEX ROUTE - GET REQUEST SHOWS ALL BLOGS
app.get('/blogs', function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("ERROR")
		}
		else {
			res.render("index", {blogs: blogs});
		}
	});
	
});

// NEW ROUTE - ADD ROUTE TO FORM FOR NEW BLOG
app.get("/blogs/new", function(req, res){
	res.render("new");
});

// CREATE ROUTE - ADD NEW BLOG TO DATABASE
app.post("/blogs", function(req, res){
	//create blog
	req.body.blog.body = req.sanitize(req.body.blog.body)
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new");
		}
		else {
			//then,redirect to index
			res.redirect("/blogs");
		}
	});
});

// SHOW ROUTE - Display more info on particular item
app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs"); 
			//res.send(err);
		}
		else {
			res.render("show", {blog: foundBlog});
		}
	})
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs")
		}
		else {
			res.render("edit", {blog: foundBlog});
		}
	})
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body)
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.redirect('/blogs');
		}
		else {
			res.redirect('/blogs/' + req.params.id);
		}
	});
});

// DESTROY ROUTE
app.delete('/blogs/:id', function(req, res){
	// Destroy blog
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err.message);
		}
		else {
			// redirect
			res.redirect('/blogs');
		}
	})
	
});