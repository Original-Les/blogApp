const Router = require("./blogs");

const express = require("express"),
      Blog = require("../models/blog"),
      Comment = require("../models/comment"),
      router = express.Router({mergeParams: true});


// ROUTES FOR COMMENTS 
// 
router.get("/new", (req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        if(err){
            console.error(err.message);
        } else {
            res.render("comments/new", {blog: blog});
        }
    });
});
// Create New Comment
router.post("/", (req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        if(err){
            console.error(err.message);
            res.send(err.message);
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    console.error(err.message);
                } else {
                    comment.save();
                    blog.comments.push(comment);
                    blog.save((err, comment) => {
                        if(err){
                            console.error(err.message);
                        } else {
                            
                            res.redirect("/blogs/" + blog._id);
                        }
                    });
                }
            });
        }
    })
});

//Comment Edit Route
router.get("/:comment_id/edit",(req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err){
            console.error(err.message);
        } else {
            res.render("comments/edit",
                {
                    blog_id  : req.params.id,
                    comment: foundComment
                }
            );
        }
    });
});

// Comment Update Route
router.put("/:comment_id", (req, res) => {
    // find comment by id and update
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, foundComment) => {
        if(err){
            console.error(err);
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// Comment Destroy Route
router.delete("/:comment_id", (err, res) => {
    if(err){
        console.error(err.message);
    } else {
        res.redirect("/blogs");
    }
});

module.exports = router;