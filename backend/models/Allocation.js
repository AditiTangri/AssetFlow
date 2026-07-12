const mongoose = require("mongoose");


const allocationSchema = new mongoose.Schema({

asset:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Asset",
    required:true
},


employee:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},


department:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Department"
},


expectedReturnDate:{
    type:Date
},


status:{
type:String,
enum:[
"ACTIVE",
"RETURNED",
"REQUESTED"
],
default:"ACTIVE"
},
history:[
{
action:String,
from:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},
to:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},
date:{
type:Date,
default:Date.now
}
}
],

returnNotes:{
    type:String
},


returnDate:{
    type:Date
},


history:[

{
action:String,

date:{
type:Date,
default:Date.now
}

}

]


},
{
timestamps:true
});


module.exports =
mongoose.model(
"Allocation",
allocationSchema
);