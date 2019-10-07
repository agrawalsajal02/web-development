var express=require("express");
var app=express();

app.get("/",function(req,res){
	res.render("home.ejs");
});

app.get("/contact/:thing",function(req,res){
	var thing= req.params.thing;
	//learn outside to inside
	res.render("love.ejs",{thingvar : thing});
});

app.use( express.static( "public" ) );
app.listen(3000,function(){
	console.log("server is started !!!\n");
});