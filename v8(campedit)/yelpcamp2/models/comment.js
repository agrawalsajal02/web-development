var mongoose=require("mongoose");

//ref refers to models which is associating with the objectid
var commentSchema=mongoose.Schema({
text:"String",
author:{
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    username:String
}


});

module.exports = mongoose.model("comment",commentSchema);