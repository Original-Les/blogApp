const express = require("express"),
	  mongoose = require("mongoose");
      
// User Model/Schema      
 const userSchema = new mongoose.Schema({
     username   : String,
     email: String,
     f_name : String,
     l_name: String,
     created: {type: Date, default: Date.now}
 });
 
 const User = mongoose.model("User", userSchema);
 module.exports = User;