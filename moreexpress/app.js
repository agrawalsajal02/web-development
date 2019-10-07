var express=require("express");
var bodyparser=require("body-parser");
 
var app=express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

//app.set("view engine","ejs");
var friends=["rahul","kiran","mohan","shama"];

app.get("/",function(req,res){
	
//	res.send("this is sajal agrawal website !!! hi sajal agjrawal");
	res.render("love.ejs",{friends:friends});
	
});
app.post("/friends",function(req,res){
	var fri=(req.body.newfriends);
friends.push(fri);
	res.redirect("/");
	//res.send("this is post page");
});




app.listen(3000,function(){
	console.log("server is listening");
});