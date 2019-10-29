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
	image:String
});

var Campground=mongoose.model("Campground",CampgroundSchema);
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
			res.render("campground.ejs",{camp:campa});
		}
	});
});
//create route , add new campground to database
app.post("/campground",function(req,res){
	///post request;
	var name=req.body.name;
	var image=req.body.image;
	var newcampa={name:name,image:image};
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
app.get("/campground/:id",function(req,res){
	res.send("this weill be show page one day");
})
app.listen(4000,function(){
	console.log("server is started");
})