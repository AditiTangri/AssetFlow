const Booking=require("../models/Booking");



// GET BOOKINGS

exports.getBookings=async(req,res)=>{

try{

const bookings =
await Booking.find();


res.json(bookings);


}
catch(error){

res.status(500).json({

message:error.message

});

}

};





// CREATE BOOKING

exports.createBooking=async(req,res)=>{

try{


const {

resource,
employee,
date,
startTime,
endTime

}=req.body;




const conflict =
await Booking.findOne({

resource,

date,

status:{
$ne:"Cancelled"
},

$or:[

{
startTime:{
$lt:endTime
},

endTime:{
$gt:startTime
}

}

]

});



if(conflict){

return res.status(400).json({

message:
"Resource already booked during this time"

});

}





const booking =
await Booking.create(req.body);



res.json(booking);


}

catch(error){

res.status(500).json({

message:error.message

});

}


};





// CANCEL

exports.cancelBooking=async(req,res)=>{

try{


const booking =
await Booking.findByIdAndUpdate(

req.params.id,

{
status:"Cancelled"
},

{
new:true
}

);


res.json(booking);


}
catch(error){

res.status(500).json({

message:error.message

});

}


};





// RESCHEDULE

exports.updateBooking=async(req,res)=>{


try{


const booking =
await Booking.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

);


res.json(booking);


}
catch(error){

res.status(500).json({

message:error.message

});

}


};