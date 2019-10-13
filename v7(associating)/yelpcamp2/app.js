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

	var commentroutes=require("./routes/comment");
	var campgroundroutes=require("./routes/campground");
	var authroutes=require("./routes/index");
	

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

app.use(authroutes);
app.use("/campground",campgroundroutes);
app.use("/campground/:id/comment",commentroutes);

 	

 
//==========================


app.listen(9000,function(){
	console.log("server is started");
						  });

