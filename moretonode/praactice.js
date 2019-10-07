var express=require("express");
var app=express();

app.get("/contact/:thing",function(req,res){
	//res.send("<h1>hi sajal</h1>");
	var thing=req.params.thing;
	res.render("new.ejs",{thing:thing});
});

app.use(express.static("public"));
/*
app.get("/contacts",function(req,res){
	res.send("<h1>contact administrator</h1>");
});
*/
app.listen(3000,function(){
	console.log("server is started");
})