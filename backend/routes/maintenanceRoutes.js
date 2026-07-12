const express =
require("express");


const router =
express.Router();



const controller =
require("../controllers/maintenanceController");



const multer =
require("multer");



const upload =
multer({
dest:"uploads/"
});





router.post(
"/",
upload.single("photo"),
controller.createMaintenance
);



router.get(
"/",
controller.getMaintenance
);



router.put(
"/approve/:id",
controller.approveMaintenance
);



router.put(
"/reject/:id",
controller.rejectMaintenance
);



router.put(
"/assign/:id",
controller.assignTechnician
);



router.put(
"/start/:id",
controller.startMaintenance
);



router.put(
"/resolve/:id",
controller.resolveMaintenance
);



module.exports=router;