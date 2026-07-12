const express = require("express");

const router = express.Router();


const {
    requestTransfer,
    approveTransfer,
    getTransfers
} = require("../controllers/transferController");



// GET ALL TRANSFER REQUESTS

router.get(
    "/",
    getTransfers
);



// CREATE TRANSFER REQUEST

router.post(
    "/request",
    requestTransfer
);



// APPROVE TRANSFER

router.put(
    "/approve/:id",
    approveTransfer
);



module.exports = router;