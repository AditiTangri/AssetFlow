const Asset=require("../models/Asset");
const QRCode=require("qrcode");




// CREATE ASSET

exports.createAsset = async (req, res) => {
  try {
    const count = await Asset.countDocuments();

    const tag = "AF-" + String(count + 1).padStart(4, "0");

    const qr = await QRCode.toDataURL(tag);

    const asset = await Asset.create({
      ...req.body,
      assetTag: tag,
      qrCode: qr,
      photo: req.file ? req.file.path : null
    });

    res.json(asset);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};





// SEARCH FILTER

exports.getAssets=async(req,res)=>{


let filter={};



if(req.query.search){

filter={
$or:[

{
assetTag:
{
$regex:req.query.search,
$options:"i"
}
},


{
serialNumber:
{
$regex:req.query.search,
$options:"i"
}
},


{
location:
{
$regex:req.query.search,
$options:"i"
}
}


]

};


}



if(req.query.status){

filter.status=req.query.status;

}




const assets=
await Asset.find(filter)
.populate("category")
.populate("department");



res.json(assets);


};
exports.getEmployeeAssets = async(req,res)=>{

    try{

        const assets = await Asset.find({
            assignedTo:req.user.id
        })
        .populate("category");


        res.json(assets);


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};