var express=	require("express"),
	app=		express(),
	mongoose=	require("mongoose"),
		bodyparser=	require("body-parser"),
		comment=require("./models/comment"),
	Campground=require("./models/campground"),
	seed=require("./seed");

app.use(express.static("public"));
mongoose.connect("mongodb://localhost/yelp_campv4");
seed();

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
		res.render("campground/index.ejs",{camp:allcampa});
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

	app.get("/campground/:id/comment/new",function(req,res){
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
	

	app.post("/campground/:id/comment",function(req,res){
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


app.listen(9000,function(){
	console.log("server is started");
						  });

