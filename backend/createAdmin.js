const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("./models/User");


async function resetAdmin(){

await mongoose.connect(process.env.MONGO_URL);


const password = await bcrypt.hash(
    "Admin@123",
    10
);


const admin = await User.findOneAndUpdate(

{
email:"admin@assetflow.com"
},

{
name:"AssetFlow Admin",
password:password,
role:"ADMIN"
},

{
new:true
}

);


console.log("Admin password reset");
console.log(admin.email);


process.exit();

}


resetAdmin();