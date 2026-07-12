const mongoose = require("mongoose");


const auditSchema = new mongoose.Schema({

department:{
    type:String,
    required:true
},


location:{
    type:String,
    required:true
},


startDate:{
    type:Date,
    required:true
},


endDate:{
    type:Date,
    required:true
},


auditor:{
    type:String,
    required:true
},


status:{
    type:String,
    default:"Open"
},


closedDate:{
    type:Date
},


createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
}


},{
    timestamps:true
});
module.exports = mongoose.model(
"Audit",
auditSchema
);

