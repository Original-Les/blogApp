const expressSanitizer  = require('express-sanitizer'),
	  methodOverride 	= require('method-override'),
	  bodyParser 		= require('body-parser'),
	  mongoose   		= require('mongoose'),
      express    		= require("express"),
	  app        		= express(),
	  port      		= 4000;
	

// DB CONNECT               
mongoose.connect("mongodb://localhost:27017/blog_app_db", {
	useNewUrlParser : true,
	useUnifiedTopology: true
})
.then(() => console.log("RESTful BlogApp Connected to DB"))
.catch(error => console.log(error.message));
// Config for deprecated update and delete paths
mongoose.set('useFindAndModify', false);

// APP CONFIG
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
	title: String,
	image: String, // {type: String, default: <imgURl>} to set a default image
	body: String,
	created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);


// RESTful ROUTES
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

// console.error works, it returns the error object
// app.listen(port1, (err) =>{
	// 	if(err) {
	// 		console.error(err);
	// 		return
	// 	}
// 	console.log("BlogApp Server Listening on port " + port1);
// });

// // StackOverflow error handling: https://stackoverflow.com/questions/56465562/how-to-check-error-in-express-listen-callback
// StackOverflow handler returns 1 line error string 

	app.listen(port, () => {
	   console.log('Listening on port: ', port);
	}).on('error', (e) => {
	   console.log('Error happened: ', e.message)
	});
