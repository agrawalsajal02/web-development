console.log("starting the express server \n ");
var express=require("express");
var app=express();

app.get("/",function(req,res){
		console.log("requesting home page ");
	res.send("  hi there , just give me some time to build this web page");
		});

app.get("*",function(req,res){
	res.send("you are the star\n");
});
app.get("/contacts",function(req,res){
	res.send("sajal agrawal nam he mara\n");
});
app.listen(3000,function(){
	console.log("server is started \n ");
});