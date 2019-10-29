var express=require("express");
var Campground=require("../models/campground");
var comment=require("../models/comment");
var router=express.Router({mergeParams:true});  

	// ====================================
	// COMMENT ROUTE
    // ====================================

	router.get("/new",isauth,function(req,res){
		console.log("inside he world");
		Campground.findById(req.params.id,function(err,camp){
if(err){
	console.log(err);
}
else{
	res.render("comment/new.ejs",{campground:camp});
}
		});
//	res.send("this will be comment page one day");
	//improtatn write here  comments/new
	//res.render("comments/new.ejs");  
	});
	

	router.post("/",isauth,function(req,res){
//res.send("successfully submitted the form");
 //lookup component using id
 //create new comment
 //connect new comment to campgorund
 //redirect to somewhere
 var id=req.params.id;
 var author=req.user.username;
 var text=req.body.text;
 var comm={author:author,text:text};
 console.log("comment are ",comm);

 //or use request.body.comment
 

 Campground.findById(id,function(err,camp){

	if(err){
	console.log(err);
	res.redirect("/campground");
}
else{
	comment.create(comm,function(err,comm){
if(err){
	console.log(err);
}
else{
	///first add username and id to the comm then push , that is called association
	comm.author.username=req.user.username;
	comm.author.id=req.user._id;
comm.save();
	camp.comment.push(comm);
	camp.save();
    var i=0;
    while(i<100000000){
        i++;
    }
    res.redirect("/campground/"+id);
}
	});
	
}
});


});

  
function isauth(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
    }


           module.exports=router;