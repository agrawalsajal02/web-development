var  mongoose=require("mongoose");
  var passportlocalmongooose=require('passport-local-mongoose');

var userSchema=new mongoose.Schema({
username:String,
password:String
});

userSchema.plugin(passportlocalmongooose);
var user=mongoose.model("user",userSchema);

module.exports=user;