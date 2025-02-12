var express=	require("express"),
	app=		express(),
	mongoose=	require("mongoose"),
	bodyparser=	require("body-parser"),
	Campground=require("./models/campground");

app.use(express.static("public"));
mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyparser.urlencoded({extended : true}));

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
		res.render("index.ejs",{camp:allcampa});
	}
});
	
	//res.render("campground.ejs",{camp:camp});
});
	
app.post("/campground",function(req,res){
	//res.send("you hit the post route");
	//get data from form and add in camparray
	//re display the get request
	var name=req.body.name;
	var image=req.body.image;
	var newcampgr={name:name,image:image};
//camp.push(newcampgr);
//create a new campground and add to database
	Campground.create(newcampgr,function(err,campa){
		if(err){
			console.log("error "+err);
			//if user tried to enter form wrong information eg name cannot be  blank , passowrd 6 letter , we do it here
	
//	res.redirect("/campground");		
		}
		else{
			console.log("new campaa is created ");
			console.log(campa);
	
	res.redirect("/campground");		
		}
	});
	
	
	
	//by default is get request campgroud
});




//show
app.get("/campground/:id",function(req,res){
	//find the campgroud with required id and 
		//render the show template with that campground
		//res.send("this weill be show page one day");
	var thing=req.params.id;
	Campground.findById(thing,function(err,found){
		if(err){
			console.log("there is an error");
		}
		else{
		console.log("we hav found the camp ");
			res.render("show.ejs",{camp:found});
		}
	});  
	})
	
	
app.get("/campground/new",function(req,res){
		res.render("new.ejs");
	});



app.listen(9000,function(){
	console.log("server is started");
						  });

