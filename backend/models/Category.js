const mongoose=require("mongoose");


const CategorySchema=new mongoose.Schema({

name:{
type:String,
required:true
},


description:{
type:String
},


warrantyPeriod:{
type:Number,
default:0
},


customFields:{
type:Object,
default:{}
},


status:{
type:String,
default:"Active"
}


});


module.exports =
mongoose.model(
"Category",
CategorySchema
);