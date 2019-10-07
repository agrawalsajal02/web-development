var express=	require("express"),
	sanitizer= 	require("express-sanitizer"),
	app=		express(),
	mongoose=	require("mongoose"),
	methodoverride=require("method-override"),
	bodyparser=	require("body-parser");
mongoose.connect("mongodb://localhost/blog_app");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
/*sanitizer is always after body parser*/
app.use(methodoverride("_method"));
app.use(sanitizer());
//mongoose model config
var blogSchema=new mongoose.Schema({
	title:String,
	image:String,
	body:String,
	created:{type:Date,default:Date.now}
});
 var blog=mongoose.model("blog",blogSchema);
/*blog.create({
	title:"Test blog",
	image:"https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c722f79d39f4dc650_340.jpg",
	body:"vey nice place to visit in summer"
});
*/
app.get("/",function(req,res){
	res.redirect("/blogs");
});

app.get("/blogs",function(req,res){
	console.log("i am here2 ");
	blog.find({},function(err,blogs){
		if(err){
			console.log("error is lying");
		}
		else{
			console.log("i am here ");
			res.render("index.ejs",{blogs:blogs});
		}
	})
	//res.render("index.ejs"); 
});

//new route
app.get("/blogs/new",function(req,res){
	res.render("new.ejs");
});

//create route
app.post("/blogs",function(req,res){
	var title=req.body.title;
	var image=req.body.image;
///	console.log(req.body.body);
	req.body.body=req.sanitize(req.body.body);
		var body=req.body.body;
	//console.log("====");
	//console.log(body);
	var newblog={title:title,image:image,body:body};
	 blog.create(newblog,function(err,blog){
		if(err){
			console.log("blog not able to creeate");
	res.render("/blogs/new");
		}
		 else{
			 res.redirect("/blogs");
		 }
	 });
	//res.send("this will be post one day");
});

//show route
app.get("/blogs/:id",function(req,res){
	var id=req.params.id;
	blog.findById(id,function(err,blog){
		if(err){
			console.log("there is an error");
			//or print here blog not found , show  a msg
		res.redirect("/blogs");
		}
		else{
			res.render("show.ejs",{blog:blog});
		}
	});
});


//edit route
app.get("/blogs/:id/edit",function(req,res){
	var id=req.params.id;
blog.findById(id,function(err,blog){
	if(err){
	res.redirect("/blogs");
	}
	else{
	res.render("edit.ejs",{blog,blog});	
	}
});
});

//update route
app.put("/blogs/:id",function(req,res){
	var title=req.body.title;
	var image=req.body.image;
	///we can also use middleware here beacuse we are running same code two times (below code)
	req.body.body=req.sanitize(req.body.body);
		var body=req.body.body;
	var replaceblog={title:title,image:image,body:body};
	var id=req.params.id;
blog.findByIdAndUpdate(id,replaceblog,function(err,updatedblog){
	if(err){
		res.redirect("/blogs");
	}
	else{
	res.redirect("/blogs/"+id);
	}
})
	//	res.send("update route");
});

//restful routes
app.delete("/blogs/:id",function(req,res){
	//destroy blog
	//redirect to somewhere else
	blog.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.send("there is error in deleting the Post");
		}
		else{
			res.redirect("/blogs");
		}
	})
	
	
	
	
	
	//res.send("You have reached Delete post");
});

app.get("/chart",function(req,res){
	res.render("chart.ejs");
})
app.listen(6000,function(){
	console.log("server is running");
});
/*
our blog app has
title
image
body
created-date
*/