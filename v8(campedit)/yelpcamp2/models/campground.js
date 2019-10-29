var mongoose=require("mongoose");	

var campgroundSchema=new mongoose.Schema({
	name:String,
	image:String,
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"user"
		},
		username:String
	},
	description:String,
    comment : [{
		type: mongoose.Schema.Types.ObjectId,
  ref: "comment"
	}]
});

module.exports=mongoose.model("Campground",campgroundSchema);