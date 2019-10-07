console.log("here we start ");
var express=require("express");
var app=express();

app.get(3000,function(req,res){
	res.send("this is sajal agrawal website !!! hi sajal agrawal");
});
app.listen(3000,function(){
	console.log("server is listening");
});