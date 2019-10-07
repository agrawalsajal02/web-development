//using embedded javascript
console.log("here we go !!\n");
var express=require("express");
var app=express();

app.get("/",function(req,res){
	//express try to find this file in views  directory
	res.render("home.ejs");
	//res.send("<h1>yes this is my web site</h1><h3>my name is saja agrawal</h3> ");
});

app.get("/contact/:thing",function(req,res){
	var thing= req.params.thing;
	res.send("hello mrs "+thing + " . you are heartly welcome here\n");
})
app.use( express.static( "public" ) );
app.listen(3000,function(){
	console.log("server is started !!!\n");
});