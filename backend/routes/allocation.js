const express = require("express");

const router = express.Router();


const {

getAllocations,
allocateAsset,
returnAsset

} = require("../controllers/allocationController");




// get all allocations

router.get(
"/",
getAllocations
);



// allocate

router.post(
"/allocate",
allocateAsset
);



// return

router.put(
"/return/:id",
returnAsset
);



module.exports = router;