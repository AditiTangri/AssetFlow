const mongoose=require("mongoose");


const UserSchema=new mongoose.Schema({

name:{
type:String,
required:true
},


email:{
type:String,
unique:true,
required:true
},


password:{
type:String,
required:true
},


role:{
type:String,
enum:[
"EMPLOYEE",
"DEPARTMENT_HEAD",
"ASSET_MANAGER",
"ADMIN"
],
default:"EMPLOYEE"
},


department:{
type:mongoose.Schema.Types.ObjectId,
ref:"Department",
default:null
},


status:{
type:String,
enum:[
"Active",
"Inactive"
],
default:"Active"
},


resetOTP:String,

otpExpiry:Date


});


module.exports=mongoose.model(
"User",
UserSchema
);