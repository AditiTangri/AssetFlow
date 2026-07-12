const Maintenance =
require("../models/Maintenance");

const Asset =
require("../models/Asset");



// CREATE REQUEST

exports.createMaintenance = async(req,res)=>{

try{


const maintenance =
await Maintenance.create({

asset:req.body.asset,

issue:req.body.issue,

priority:req.body.priority,

photo:req.file?
req.file.filename:
""

});


res.json({

message:"Maintenance request created",

maintenance

});


}

catch(error){

res.status(500).json({

message:error.message

});

}

};






// GET ALL

exports.getMaintenance = async(req,res)=>{

try{


const data =
await Maintenance.find()
.sort({
createdAt:-1
});


res.json(data);


}

catch(error){

res.status(500).json({

message:error.message

});

}

};








// APPROVE


exports.approveMaintenance =
async(req,res)=>{


try{


const item =
await Maintenance.findById(
req.params.id
);



item.status="Approved";

item.assetStatus=
"Under Maintenance";


await item.save();



await Asset.findOneAndUpdate(

{
name:item.asset
},

{
status:"Under Maintenance"
}

);



res.json({

message:"Approved"

});



}

catch(error){

res.status(500).json({

message:error.message

});

}


};









// REJECT


exports.rejectMaintenance =
async(req,res)=>{


try{


const item =
await Maintenance.findById(
req.params.id
);


item.status="Rejected";


await item.save();



res.json({

message:"Rejected"

});


}

catch(error){

res.status(500).json({

message:error.message

});

}


};









// ASSIGN TECHNICIAN


exports.assignTechnician =
async(req,res)=>{


try{


const item =
await Maintenance.findById(
req.params.id
);



item.technician =
req.body.technician;



item.status =
"Technician Assigned";



await item.save();



res.json({

message:"Technician Assigned"

});


}

catch(error){

res.status(500).json({

message:error.message

});

}


};









// START WORK


exports.startMaintenance =
async(req,res)=>{


try{


const item =
await Maintenance.findById(
req.params.id
);



item.status =
"In Progress";



await item.save();



res.json({

message:"Maintenance Started"

});


}

catch(error){

res.status(500).json({

message:error.message

});

}


};









// RESOLVE


exports.resolveMaintenance =
async(req,res)=>{


try{


const item =
await Maintenance.findById(
req.params.id
);



item.status =
"Resolved";


item.assetStatus =
"Available";


item.resolvedDate =
new Date()
.toLocaleDateString();



await item.save();





await Asset.findOneAndUpdate(

{
name:item.asset
},

{
status:"Available"
}

);





res.json({

message:"Maintenance Completed",

item

});


}


catch(error){


res.status(500).json({

message:error.message

});


}


};