var express=	require("express"),
	app=		express(),
	mongoose=	require("mongoose"),
		bodyparser=	require("body-parser"),
		comment=require("./models/comment"),
	Campground=require("./models/campground"),
	seed=require("./seed"),
	passport=require("passport"),
	user=require("./models/user"),
	localstrategy=require("passport-local");

app.use(express.static(__dirname+"/public"));
mongoose.connect("mongodb://localhost/yelp_campv4");
seed();

app.use(bodyparser.urlencoded({extended : true}));


///=========================
       //passport configuration
app.use(require("express-session")({
secret:"sajal is very good boy",
	saveUninitialized:false,
resave:false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
passport.use(new localstrategy(user.authenticate()));

app.use(function(req,res,next){
res.locals.currentuser=req.user;
next();
//generally it is route handler
});

//==========================


app.get("/",function(req,res){
	//res.send("hi ");
	res.render("landing.ejs");
});	

app.get("/campground",function(req,res){
//we need to get all campground form dbs

Campground.find({},function(err,allcampa){
	if(err){
		console.log("error in page");
	}
	else{
		console.log("campgrounds are");
		res.render("campground/index.ejs",{camp:allcampa,currentuser:req.user});
	}
});
	
	//res.render("campground.ejs",{camp:camp});
});
	


app.get("/campground/new",function(req,res){

//	res.send("hi sajal");
			res.render("campground/new.ejs");
	});



	
app.post("/campground",function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var newcampgr={name:name,image:image,description:desc};
	Campground.create(newcampgr,function(err,campa){
		if(err){
			console.log("error "+err);
		}
		else{
			console.log("new campaa is created ");
			console.log(campa);
	
	res.redirect("/campground");		
		}
	});
	
	
	
	//by default is get request campgroud
});


	app.get("/campground/:id",function(req,res){
		//find the campgroud with required id and 
			//render the show template with that campground
			//res.send("this weill be show page one day");
		console.log("inside");
			var thing=req.params.id;
		Campground.findById(thing).populate("comment").exec(function(err,found){
			if(err){
				console.log("there is an error"+err);
			}
			else{
			console.log("we hav found the camp "+found);
				res.render("campground/show.ejs",{camp:found});
			}
		});  
		});
		
		
	// ====================================
	// COMMENT ROUTE
    // ====================================

	app.get("/campground/:id/comment/new",isauth,function(req,res){
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
	

	app.post("/campground/:id/comment",isauth,function(req,res){
//res.send("successfully submitted the form");
 //lookup component using id
 //create new comment
 //connect new comment to campgorund
 //redirect to somewhere
 var id=req.params.id;
 var author=req.body.author;
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
	camp.comment.push(comm);
	camp.save();
	res.redirect("/campground/"+id);
}
	});
	
}
});



});
//=====================
//auth routes
//==================

app.get("/register",function(req,res){
res.render("register.ejs"); 
});

app.post("/register",function(req,res){
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
app.get("/login",function(req,res){
res.render("login.ejs");
});

//app.pst(route, middleware,callback)
app.post("/login",passport.authenticate("local",{
	successRedirect:"/campground",
	failureRedirect:"/login"
}),function(req,res){
var username=req.body.username;
var password=req.body.password;
});

function isauth(req,res,next){
if(req.isAuthenticated()){
	return next();
}
res.redirect("/login");
}
//loguot route
app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/campground");
})
app.listen(9000,function(){
	console.log("server is started");
						  });

