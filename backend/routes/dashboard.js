const express=require("express");

const router=express.Router();


const {

getStats,
getOverdue,
getUpcoming

}=require("../controllers/dashboardController");



router.get(
"/stats",
getStats
);


router.get(
"/overdue",
getOverdue
);


router.get(
"/upcoming",
getUpcoming
);



module.exports=router;