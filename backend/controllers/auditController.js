const Audit = require("../models/Audit");
const AssetVerification = require("../models/AssetVerification");
const Asset = require("../models/Asset");



// CREATE AUDIT

exports.createAudit = async(req,res)=>{

try{

const audit = await Audit.create(req.body);


res.status(201).json(audit);


}
catch(error){

res.status(500).json({
message:error.message
});

}

};





// GET AUDITS

exports.getAudits = async(req,res)=>{

try{


const audits =
await Audit.find()
.sort({
createdAt:-1
});


res.json(audits);


}
catch(error){

res.status(500).json({
message:error.message
});

}


};






// GET ASSETS

exports.getAuditAssets = async(req,res)=>{


try{


const assets =
await Asset.find();


res.json(assets);


}
catch(error){

res.status(500).json({
message:error.message
});

}


};







// VERIFY ASSET




exports.verifyAsset = async(req,res)=>{

try{


const asset = await Asset.findByIdAndUpdate(

req.params.id,

{

auditStatus:req.body.status

},

{
new:true
}

);



res.json(asset);



}

catch(error){

console.log(error);

res.status(500).json({

message:error.message

});


}


};






// DISCREPANCY

exports.getDiscrepancy = async(req,res)=>{


try{


const result =

await AssetVerification.find({

status:{
$in:[
"Missing",
"Damaged"
]
}

})
.populate("asset");



res.json(result);


}
catch(error){

res.status(500).json({
message:error.message
});

}


};








// CLOSE AUDIT

exports.closeAudit = async(req,res)=>{


try{


const audit =
await Audit.findById(
req.params.id
);



if(!audit){

return res.status(404).json({

message:"Audit not found"

});

}



audit.status="Closed";

audit.closedDate=new Date();


await audit.save();


res.json(audit);



}
catch(error){

res.status(500).json({
message:error.message
});

}


};