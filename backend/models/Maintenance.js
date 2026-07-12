const mongoose = require("mongoose");


const maintenanceSchema = new mongoose.Schema({

asset:{
    type:String,
    required:true
},


issue:{
    type:String,
    required:true
},


priority:{
    type:String,
    enum:[
        "Low",
        "Medium",
        "High"
    ],
    required:true
},


photo:{
    type:String
},


technician:{
    type:String,
    default:"Not Assigned"
},


status:{
    type:String,
    default:"Pending"
},


assetStatus:{
    type:String,
    default:"Available"
},


createdAt:{
    type:Date,
    default:Date.now
},


resolvedDate:{
    type:String
}


});


module.exports =
mongoose.model(
"Maintenance",
maintenanceSchema
);