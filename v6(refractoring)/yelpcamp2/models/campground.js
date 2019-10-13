var mongoose=require("mongoose");	

var campgroundSchema=new mongoose.Schema({
	name:String,
	image:String,
	description:String,
    comment : [{
		type: mongoose.Schema.Types.ObjectId,
  ref: "comment"
	}]
});

module.exports=mongoose.model("Campground",campgroundSchema);