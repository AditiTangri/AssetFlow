const express=require("express");

const router=express.Router();


const {

getBookings,
createBooking,
cancelBooking,
updateBooking

}=require("../controllers/bookingController");



router.get(
"/",
getBookings
);


router.post(
"/",
createBooking
);


router.put(
"/cancel/:id",
cancelBooking
);


router.put(
"/:id",
updateBooking
);



module.exports=router;