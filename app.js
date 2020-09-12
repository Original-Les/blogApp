const expressSanitizer  = require('express-sanitizer'),
	  methodOverride 	= require('method-override'),
	  bodyParser 		= require('body-parser'),
	  mongoose   		= require("mongoose"),
      express    		= require("express"),
	  app        		= express(),
	  router 			= express.Router();
	 
//const { Router } = require('express');
// Define Routes
const blogRoutes = require("./routes/blogs"),
	  commentRoutes = require("./routes/comments");	

// DB CONNECT               
mongoose.connect("mongodb://localhost:27017/blog_app_db", {
	useNewUrlParser : true,
	useUnifiedTopology: true
})
.then(() => console.log("Chaotic Basement Thoughts Connected To DB"))
.catch(error => console.log(error.message));
// Config for deprecated update and delete paths
mongoose.set('useFindAndModify', false);

// APP CONFIG
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());


// Requiring ExpressRoutes
//app.use('/', indexRoutes);
app.use('/', blogRoutes);
app.use('/blogs/:id/comments', commentRoutes);

const port = process.env.PORT || 3004;
app.listen(port, () => {
  console.log('Chaotic Basement Thoughts on port: ', port);
 }).on('error', (err) => {
	   console.error('Error happened: ', err.message)
	});

module.exports = router;