var express=require("express");
var app=express();
app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("home");
});

app.get("/contact/",function(req,res){
var posts=[
	{thing:"sajal" , require:"software engineer"},
{	thing:"rahul" , require:"developer"}
];
	res.render("love",{posts:posts});
});


app.listen(3000,function(){
	console.log("server is started !!!\n");
});