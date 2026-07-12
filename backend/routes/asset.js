const express=require("express");
const router=express.Router();

const upload=require("../middleware/upload");
const authMiddleware =
require("../middleware/authMiddleware");
const {
createAsset,
getAssets,
getEmployeeAssets
}=require("../controllers/assetController");


router.post(
"/",
upload.single("photo"),
createAsset
);


router.get(
"/",
getAssets
);
router.get(
"/my-assets",
authMiddleware,
getEmployeeAssets
);

module.exports=router;