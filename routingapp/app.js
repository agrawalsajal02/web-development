console.log("here we start\n");

var express=require("express");
var app=express();

app.get("/",function(req,res){
		console.log("requesting home page ");
	res.send("  hi there , just give me some time to build this web page");
		});

app.get("/speak/:anything",function(req,res){
		var name=req.params.anything;
	if(name==="dog"){
		res.send("the "+name+" say "+" wooh wooh !!\n");
	}
	else if(name==="cow"){
		res.send("the "+name+" say "+" mohhh !!\n");
	}
	else if(name==="pig"){
		res.send("the "+name+" say "+" 0ink\n");
	}
	else{
		res.send("animal not found\n");
	}
		});
app.get("/repeat/:anything/:times",function(req,res){
	var name=req.params.anything;
	var time= Number(req.params.times);
	var result = "";
	for(var i=1;i<=time;i++){
	result += name;
		result+=" "; 
	}
	res.send(result);
});

app.get("*",function(req,res){
	res.send("what are yu doing with your life\n");
})
app.listen(3000,function(){
	console.log("server started \n");
});