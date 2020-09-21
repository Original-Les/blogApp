const express = require("express"),
      router = express.Router(),
      Router = require("./blogs");
      

router.get("/", (req, res) => {
    res.redirect("/blogs");
});

router.get("/signup", ( req,res) => {
    res.render("signup");
});

module.exports = router;