const mongoose=require("mongoose");


const assetVerificationSchema =
new mongoose.Schema({


asset:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Asset",
    required:true
},


audit:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Audit",
    required:true
},


status:{
    type:String,
    enum:[
        "Pending",
        "Verified",
        "Missing",
        "Damaged"
    ],
    default:"Pending"
}


},{
timestamps:true
});


module.exports =
mongoose.model(
"AssetVerification",
assetVerificationSchema
);