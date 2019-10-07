var express=require("express");
var app=express();
var bodyparser=require("body-parser");
app.use(express.static("public"));
var camp=[
		{name :"salmon creek ",image:"https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c722f7bd69245c15d_340.jpg"},
			  {name:"granite hills",image:"https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c722f7bd69245c15d_340.jpg"},
			  {name:"mountain goat",image:"https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744e752f79d19f49c0_340.jpg"},
			  {name:"hili palace",image:"https://pixabay.com/get/57e0d6424b56ad14f6da8c7dda793f7f1636dfe2564c704c722f7bd69245c15d_340.jpg"},
		{name :"salmon creek ",image:"https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c722f7bd69245c15d_340.jpg"},
			  {name:"granite hills",image:"https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c722f7bd69245c15d_340.jpg"},
			  {name:"mountain goat",image:"https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744e752f79d19f49c0_340.jpg"},
			  {name:"hili palace",image:"https://pixabay.com/get/57e0d6424b56ad14f6da8c7dda793f7f1636dfe2564c704c722f7bd69245c15d_340.jpg"}
	];
app.use(bodyparser.urlencoded({extended : true}));

app.get("/",function(req,res){
	//res.send("hi ");
	res.render("landing.ejs");
});	

app.get("/campground",function(req,res){
res.render("campground.ejs",{camp:camp});
});
	
app.post("/campground",function(req,res){
	//res.send("you hit the post route");
	//get data from form and add in camparray
	//re display the get request
	var name=req.body.name;
	var image=req.body.image;
	var newcampgr={name:name,image:image};
camp.push(newcampgr);
	res.redirect("/campground");
	//by default is get request campgroud
});


app.get("/campground/new",function(req,res){
		res.render("new.ejs");
	});



app.listen(4000,function(){
	console.log("server is started");
						  });

