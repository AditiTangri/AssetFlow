const Allocation = require("../models/Allocation");
const Asset = require("../models/Asset");

const Transfer=require("../models/Transfer");


// GET ALL ALLOCATIONS

exports.getAllocations = async(req,res)=>{

try{

const allocations = await Allocation.find()
.populate("asset")
.populate("employee");


res.json(allocations);

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
message:"Transfer request not found"
});

}



transfer.status="APPROVED";

await transfer.save();



const allocation =
await Allocation.findOne({

asset:transfer.asset,

status:"ACTIVE"

});



if(!allocation){

return res.status(404).json({

message:"Active allocation not found"

});

}



allocation.employee =
transfer.toEmployee;



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

message:"Transfer approved and allocation updated"

});


}


catch(error){

console.log(error);

res.status(500).json({

message:error.message

});

}

};





// ALLOCATE ASSET

exports.allocateAsset = async(req,res)=>{

try{


const {
asset,
employee,
expectedReturnDate
}=req.body;



if(!asset || !employee){

return res.status(400).json({

message:"Asset and employee are required"

});

}



const existing =
await Allocation.findOne({

asset:asset,

status:"ACTIVE"

})
.populate("employee");



if(existing){


return res.status(400).json({

conflict:true,

message:
`Asset is currently held by ${existing.employee.name}`,

holder:existing.employee

});


}




const allocation =
await Allocation.create({

asset,

employee,

expectedReturnDate,

status:"ACTIVE"

});





await Asset.findByIdAndUpdate(

asset,

{
status:"Allocated"
}

);



res.json(allocation);



}
catch(error){


res.status(500).json({

message:error.message

});


}

};








// RETURN ASSET

exports.returnAsset=async(req,res)=>{


try{


const allocation =
await Allocation.findById(req.params.id);



if(!allocation){

return res.status(404).json({

message:"Allocation not found"

});

}



allocation.status="RETURNED";

allocation.returnDate=new Date();

allocation.returnNotes=req.body.notes;



allocation.history.push({

action:"Returned",

date:new Date()

});



await allocation.save();



await Asset.findByIdAndUpdate(

allocation.asset,

{
status:"Available"
}

);



res.json({

message:"Asset returned"

});


}


catch(error){

res.status(500).json({

message:error.message

});

}


};