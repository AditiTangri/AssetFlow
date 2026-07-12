const mongoose=require("mongoose");


const transferSchema =
new mongoose.Schema({

asset:{
type:mongoose.Schema.Types.ObjectId,
ref:"Asset",
required:true
},


fromEmployee:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},


toEmployee:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},


status:{
type:String,
default:"REQUESTED"
},


createdAt:{
type:Date,
default:Date.now
}


});


module.exports =
mongoose.model(
"Transfer",
transferSchema
);