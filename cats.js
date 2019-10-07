//mongoose is object data mapper odm
//way to write javascript inside file, basically a javascript that added into top of mongodb
var mongoose=require("mongoose");
//add new cat to databases
//retrrieve all cats
//to telll mongoose to conect to server
//it will try to find catpp database , if not found it will create new , and connect it to me
mongoose.connect("mongodb://localhost/cat_app", { useNewUrlParser: true , useUnifiedTopology: true});

var catSchema=new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});
//use this if having problem for starting the mono server
//sudo mongod --port 27018

//then modeling the schema
//Cat is singular version of our model and it will take to make collection of cat
var Cat=mongoose.model("Cat",catSchema);


//we can use now , cat.find cat.remocve cat.create
/*
var george=new Cat({
	name:"George",
	age:11,
	temperament:"Grouchy"
});
var noris=new Cat({
	name:"mr norris",
	age:7,
	temperament:"Evil"
});*/
//once it .save it will save it to database,but thereis possibliy that it will not save to database , therefore not do blindly , we pass callback function , which tells whether the operation is successfull or not and this process takes time
//second item is that item that is saved
/*
console.log("entering the databases ");
noris.save(function(err,cat){
	if(err){
		console.log("something went wrong");
	}
	else{
		console.log("we just saved the cat \n");
		console.log(cat);
		
	}
});*/
//new and svaing both
Cat.create({
	name:"snow white",
	age:15,
	temperament:"bland"
},function(err,cat){
	if(err){
		console.log("error");
	}
	else{
		console.log("succ "+cat);
	}
	
});
Cat.find({},function(err,cats){
		 if(err){
	console.log("error");
}
else{
	console.log("we have suceessful "+cats);
}
		 });