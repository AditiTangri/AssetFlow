const mongoose=require("mongoose");


const bookingSchema=new mongoose.Schema({

resource:{
type:String,
required:true
},


employee:{
type:String,
required:true
},


date:{
type:String,
required:true
},


startTime:{
type:String,
required:true
},


endTime:{
type:String,
required:true
},


status:{
type:String,
default:"Upcoming"
},


createdAt:{
type:Date,
default:Date.now
}

});


module.exports =
mongoose.model(
"Booking",
bookingSchema
);