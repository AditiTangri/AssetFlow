const Asset = require("../models/Asset");
const Booking = require("../models/Booking");
const Maintenance = require("../models/Maintenance");
const Transfer = require("../models/Transfer");



// KPI DATA

exports.getStats = async(req,res)=>{

try{


const available =
await Asset.countDocuments({
status:"Available"
});


const allocated =
await Asset.countDocuments({
status:"Allocated"
});


const maintenance =
await Maintenance.countDocuments({

status:{
$in:[
"Pending",
"Approved",
"In Progress"
]

}

});



const bookings =
await Booking.countDocuments({

status:{
$in:[
"Upcoming",
"Ongoing"
]

}

});



const transfers =
await Transfer.countDocuments({

status:"Requested"

});



const upcomingReturns =
await Asset.countDocuments({

expectedReturnDate:{
$gte:new Date()
}

});



res.json({

available,

allocated,

maintenance,

bookings,

transfers,

upcomingReturns

});


}
catch(error){

res.status(500)
.json({
message:error.message
});

}


};





// overdue assets

exports.getOverdue = async(req,res)=>{


try{


const assets =
await Asset.find({

expectedReturnDate:{
$lt:new Date()
},


status:"Allocated"


})
.populate(
"allocatedTo"
);



res.json(assets);


}
catch(error){

res.status(500)
.json({
message:error.message
});

}


};





// upcoming returns

exports.getUpcoming = async(req,res)=>{


const assets =
await Asset.find({

expectedReturnDate:{
$gte:new Date()
}

})
.limit(5);


res.json(assets);


};
exports.overdueAssets=async(req,res)=>{


const count =
await Allocation.countDocuments({

status:"ACTIVE",

expectedReturnDate:{
$lt:new Date()
}

});


res.json({

count

});


};