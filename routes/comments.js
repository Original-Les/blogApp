
const express = require("express"),
      Blog = require("../models/blog"),
      Comment = require("../models/comment"),
      router = express.Router();
// ROUTES FOR COMMENTS 
router.get("/", function(req, res){
            res.render("new");
    });

module.exports = router;