
const express = require("express"),
      Blog = require("../models/blog"),
      Comment = require("../models/comment"),
      router = express.Router({mergeParams: true});


// ROUTES FOR COMMENTS 
// 
router.get("/new", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err){
            console.error(err.message);
        } else {
            res.render("comments/new",{blog: foundBlog});
        }
    });
});
// Create New Comment
router.post("/", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err){
            console.error(err.message);
        } else {
            console.log(req.body.blog.comment);
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    console.error(err.message);
                } else {
                    comments.save();
                    foundBlog.comments.push(comment);
                    foundBlog.save((err, comment) =>{
                        if(err){
                            console.error(err.message);
                        } else {
                            console.log(comment);
                            res.redirect("/blogs/" + blogs._id);
                        }
                    });
                }
            });
        }
    })
});

// TODO: COMMENT EDIT ROUTE
    // show new comment form


module.exports = router;