//in referencing , we actuaaly post array insdie actual post
//and have id in user
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/blog_demoref");
//we define two model
//user  -email ,  name
var postSchema=new mongoose.Schema({
    title:String,
    content: String
    });
    
        var post=mongoose.model("post",postSchema);
    
var userSchema=new mongoose.Schema({
    email:String,
    name:String,
    post : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    }]
    //we wana array or list of post , jest name of schema
});


/*
NAME : "SAKA"
POST :[
    12811,484984,549849,84984/
    //WE ARE REFERENCING THE ID OF ANOTHER POST RATHER THAN EMBEDDING THAN SAME POST
]
*/
//post has title and content
var user=mongoose.model("user",userSchema);

/*
user.create({
    email: "bob@gmail.com",
    name: "bom marcy"
},function(err,name){
    if(err){
        console.log("there is an error");
    }
    else{
        console.log("here is user"+name);
    }
});*/

/*
post.create({
    title: "we are cooking new food",
    content:" we are cooking sushi"
},function(err,post){
    console.log("here is "+post);
});
*/

//
//now how to connect post id to user

/*

post.create({
    title: "how fto cook new food",
    content:" yfes we can"
},function(err,post){
    //console.log("here "+post);
    user.findOne({name:"bom marcy"},function(err,user){
if(err){
    console.log("there is error");
}
else{
    user.post.push(post);
    user.save(function(err,data){
if(err){
    console.log("cannot save");
}
else{
    console.log("final data here "+data);
}
    })
}
    });
});



*/

//now how to access post via user (id is only given)
//find user and finad all post for that user
user.findOne({email:"bob@gmail.com"}).populate("post").exec(function(err,user){
   if(err){
       console.log(err);
   }  
   else{
       console.log(user);
   }
});