var express=	require("express"),
	app=		express();
	mongoose=	require("mongoose"),
	bodyparser=	require("body-parser")
	;

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost/yelp_camp");

var CampgroundSchema=new mongoose.Schema({
	name:String,
	image:String,
	description:String
});
var Campground=mongoose.model("Campground",CampgroundSchema);
/*
Campground.create({
name:"granite hills",image:"https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744e752d7cdc974ecd_340.jpg",
	description:"this is very beautiful site"
},function(err,camp){
	if(err){
		console.log("error");
	}
	else{
		console.log("Newly created campground");
		console.log(camp);
		
	}
});*/
app.get("/",function(req,res){
	res.render("landing.ejs");
});
//index route , to display all campdorund
app.get("/campground",function(req,res){
	Campground.find({},function(err,campa){
		if(err){
			console.log("there is error");
		}
		else{
			res.render("index.ejs",{camp:campa});
		}
	});
});
//create route , add new campground to database
app.post("/campground",function(req,res){
	///post request;
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var newcampa={name:name,image:image,description:desc};
	Campground.create(newcampa,function(err,campa){
		if(err){
			console.log("there is disastous error");
		}
		else{
			console.log("new campa are "+campa);
			res.redirect("/campground");
		}
	});
});
//new , to show form to create new route
app.get("/campground/new",function(req,res){
	res.render("new.ejs");
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


app.listen(4000,function(){
	console.log("server is started");
})