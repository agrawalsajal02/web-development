 var express=require("express");
var router=express.Router();  
var passport=require("passport");
var user=require("../models/user");
router.get("/",function(req,res){
	//res.send("hi ");
	res.render("landing.ejs");
});	


router.get("/register",function(req,res){
res.render("register.ejs"); 
});



router.post("/register",function(req,res){
user.register(new user({username:req.body.username}), req.body.password , function(err,user){
if(err){
	console.log(err);
	res.redirect("/register");
}
else{
	passport.authenticate("local")(req,res,function(){
		res.redirect("/campground");    
	})



}
});
});


//login
router.get("/login",function(req,res){
res.render("login.ejs");
});

//app.pst(route, middleware,callback)
router.post("/login",passport.authenticate("local",{
	successRedirect:"/campground",
	failureRedirect:"/login"
}),function(req,res){
var username=req.body.username;
var password=req.body.password;
});


//loguot route
router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/campground");
});

module.exports=router;
