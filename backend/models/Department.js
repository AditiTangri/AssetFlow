const mongoose=require("mongoose");


const DepartmentSchema=new mongoose.Schema({

name:{
type:String,
required:true
},


head:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
default:null
},


parent:{
type:mongoose.Schema.Types.ObjectId,
ref:"Department",
default:null
},


status:{
type:String,
enum:["Active","Inactive"],
default:"Active"
}


});


module.exports=mongoose.model(
"Department",
DepartmentSchema
);