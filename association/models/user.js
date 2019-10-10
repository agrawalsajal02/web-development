
var mongoose=require("mongoose");
var userSchema=new mongoose.Schema({
    email:String,
    name:String,
    post : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    }]
    //we wana array or list of post , jest name of schema
});

var user=mongoose.model("user",userSchema);
module.exports=user;
