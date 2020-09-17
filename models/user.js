const express               = require("express"),
      mongoose              = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose");
      
// User Model/Schema      
 const UserSchema = new mongoose.Schema({
     username   : String,
     email: Array,
     password: String,
     f_name : String,
     l_name: String,
     created: {type: Date, default: Date.now}
 });

 UserSchema.plugin(passportLocalMongoose);
 
 
 const User = mongoose.model("User", UserSchema);
 module.exports = User;