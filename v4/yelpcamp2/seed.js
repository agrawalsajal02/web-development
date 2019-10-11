var mongoose=require("mongoose");
var Campground=require("./models/campground");
var comment=require("./models/comment");
var data =[{
name:"daniel",
image:"http://www.nitp.ac.in/images/DSC_0108.jpg",
description:"shala"
},
{
    name:"mukesh",
    image:"http://www.nitp.ac.in/images/senate_2018.jpg",
    description:"ramatae"
    
},
{
    name:"mech",
image:"http://www.nitp.ac.in/images/President_Kovindji.jpg",
description:"engineer"

}
    ];
function seed(){
    //remove few campground
    Campground.remove({},function(err){
        if(err){
            console.log("porblem in deleting");
        }
        else{
            console.log("deleted ");
   
   data.forEach(function(camp){
Campground.create(camp,function(err,data){
    if(err){
        console.log("cannot be printed"+err);
    }
    else{
        console.log("insert successfull");
       comment.create({
           text:"looking good",
           author: "rahul  singh"
       },function(err,cam){
           if(err){
               console.log("err in pushing");
           }
           else{    
            data.comment.push(cam);
            data.save();
            console.log("comment is added");
           }
       });
    
    
    
    }
})
   });
   
        }   
    });


}


module.exports= seed;