var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/blog_demoref");

user=require("./models/user");
post=require("./models/post");


post.create({
    title: "codechef",
    content:"best site"
},function(err,post){
    //console.log("here "+post);
    user.findOne({name:"bom marcy"},function(err,user){
if(err){
    console.log(err);
}
else{
    user.post.push(post);
    user.save(function(err,data){
if(err){
    console.log("cannot save");
}
else{
    console.log("final here "+data);
}
    })
}
    });
});



