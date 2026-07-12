const Transfer = require("../models/Transfer");
const Allocation = require("../models/Allocation");



exports.requestTransfer = async(req,res)=>{

try{

const {
asset,
fromEmployee,
toEmployee
}=req.body;


const transfer =
await Transfer.create({

asset,

fromEmployee,

toEmployee,

status:"REQUESTED"

});


res.json({

message:"Transfer request created",

transfer

});


}
catch(error){

res.status(500).json({

message:error.message

});

}

};





exports.approveTransfer = async(req,res)=>{

try{

const transfer =
await Transfer.findById(req.params.id);


if(!transfer){

return res.status(404).json({

message:"Transfer not found"

});

}


// Update transfer status

transfer.status="APPROVED";

await transfer.save();



// Find active allocation

const allocation =
await Allocation.findOne({

asset:transfer.asset,

status:"ACTIVE"

});


if(!allocation){

return res.status(404).json({

message:"Allocation not found"

});

}



// Change current allocation employee

allocation.employee =
transfer.toEmployee;



// Create history if missing

if(!allocation.history){

allocation.history=[];

}



allocation.history.push({

action:"Transferred",

from:transfer.fromEmployee,

to:transfer.toEmployee,

date:new Date()

});



await allocation.save();



res.json({

message:"Transfer approved"

});


}

catch(error){

console.log(error);

res.status(500).json({

message:error.message

});

}

};
exports.getTransfers = async(req,res)=>{

try{


const transfers =
await Transfer.find()

.populate("asset")

.populate("fromEmployee")

.populate("toEmployee");



res.json(transfers);



}
catch(error){


res.status(500).json({

message:error.message

});


}

};

