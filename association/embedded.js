//two  types of massociation 
//emedding data and refrencing data
//therefore we use embedding data here
//include array of object inside user , one to many relationship
//findOne is used to reteive one item form database
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/blog_demos");
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
    post : [postSchema]
    //we wana array or list of post , jest name of schema
});

//post has title and content
var user=mongoose.model("user",userSchema);
/*
var newuser=new user({
email: "hermolne@gmail.com",
name: "uynbff brown"
});
newuser.post.push({
    title:"how to grow eledly",
    content :"i love harry poter"
}); 

newuser.save(function(err,user){
    if(err){
        console.log("there is a error");
    }
    else{
        console.log("user is saved"+user);
    }
});
/*
var newpost=new post({
    title: "india is coming as new super power",
    content: "coming soon"
});
newpost.save(function(err,post){
if(err){
    console.log("there is a error");
}
else{
    console.log("it is successfull");
}
});
//*/
/*type of data inside
{
    email: "asdas",
    name : "asdas",
    posts : [
        {title : "asdas", content: "asdas"   },
        {title : "asdfdas", content: "adfgsdas"    },
        //one to many replation , array of post
        //one user can have many post  
    ]
}
*/

user.findOne({name:"uynbff brown"},function(err,user){
    if(err){
        console.log("error");
    }
    else{
                //console.log("here "+user);
    user.post.push({
   title:"hello",
   content: "bravo"
    });

    user.save(function(err,use){
        if(err){
            console.log("error");
        }
        else{
            console.log("here "+use);
        }
    });
    
    
            }
});



