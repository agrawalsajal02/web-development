var mongoose=require("mongoose");
//define user schema
var passportlocalmongoose=require("passport-local-mongoose");
var userSchema= new mongoose.Schema({
username:String,
password:String
});

userSchema.plugin(passportlocalmongoose);
//it add bunch of diffrernt methods and important functionalinity with user schema


var user=mongoose.model("user",userSchema);

module.exports=user;