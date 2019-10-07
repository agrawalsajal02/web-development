console.log("our first express app !!!");
var express=require("express");
var app=express();

app.get("/",function(req,res){
	console.log("we are at home page");
	res.send("hi you are at home !!\n");
});

app.get("/details",function(req,res){
	res.send("name:nam to suna hi hoga \n rollno:1706129 \n ");
});

//we have to tell express that listen to servers
//    var port = process.env.PORT || 3000;
    app.listen(3000, function () {
      console.log("Server started!");
    });  
