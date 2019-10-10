
var mongoose=require("mongoose");
//steps: 1)import all packages
//step 2:  rake sure you retrun some value as you d in function
var postSchema=new mongoose.Schema({
    title:String,
    content: String
    });
    
        var post=mongoose.model("post",postSchema);

        module.exports=post;
