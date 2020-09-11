const expressSanitizer  = require('express-sanitizer'),
	  methodOverride 	= require('method-override'),
	  bodyParser 		= require('body-parser'),
	  mongoose   		= require("mongoose"),
      express    		= require("express"),
	  app        		= express();
	 
	

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Chaotic Basement Thoughts on port: ', port);
 }).on('error', (err) => {
	   console.log('Error happened: ', err.message)
	});
