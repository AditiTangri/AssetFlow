const mongoose=require("mongoose");


const AssetSchema=new mongoose.Schema({


assetTag:{
type:String,
unique:true
},


qrCode:{
type:String
},


name:{
type:String,
required:true
},


category:{
type:mongoose.Schema.Types.ObjectId,
ref:"Category"
},


serialNumber:{
type:String,
unique:true
},


acquisitionDate:Date,


acquisitionCost:Number,


condition:{
type:String,
default:"Good"
},


location:String,


department:{
type:mongoose.Schema.Types.ObjectId,
ref:"Department"
},


photo:String,


documents:String,


shared:{
type:Boolean,
default:false
},


status:{
    type:String,
    enum:[
        "Pending",
        "Available",
        "Allocated",
        "Reserved",
        "Under Maintenance",
        "Lost"
    ],
    default:"Pending"
},


createdAt:{
type:Date,
default:Date.now
}
,auditStatus:{
type:String,
default:"Pending"
}

});


module.exports=
mongoose.model(
"Asset",
AssetSchema
);