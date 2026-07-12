const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const User = require("./models/User");


const app = express();


app.use(cors());

app.use(express.json());


// Test route
app.get("/", (req,res)=>{
    res.send("AssetFlow Backend Running");
});
const dashboardRoutes =
require("./routes/dashboard");


app.use(
"/api/dashboard",
dashboardRoutes
);

// Auth routes
app.use("/api/auth", authRoutes);



mongoose.connect(process.env.MONGO_URL)
.then(async()=>{

    console.log("MongoDB connected");


    console.log(
        "Database:",
        mongoose.connection.name
    );


    const users = await User.find();


    console.log("Users in database:");
    console.log(users);



    app.listen(5000,()=>{

        console.log("Server running on port 5000");

    });


})
.catch((error)=>{

    console.log(error);

});
const organizationRoutes =
require("./routes/organization");


app.use(
"/api/organization",
organizationRoutes
);

const assetRoutes =
require("./routes/asset");


app.use(
"/api/assets",
assetRoutes
);
app.use(
"/uploads",
express.static("uploads")
);

const allocationRoutes =
require("./routes/allocation");


app.use(
"/api/allocation",
allocationRoutes
);
const transferRoutes = require("./routes/transferRoutes");

app.use(
"/api/transfer",
transferRoutes
);
const bookingRoutes =
require("./routes/bookingRoutes");


app.use(
"/api/bookings",
bookingRoutes
);
const maintenanceRoutes =
require("./routes/maintenanceRoutes");


app.use(
"/api/maintenance",
maintenanceRoutes
);
const auditRoutes = require("./routes/auditRoutes");

app.use(
"/api/audits",
auditRoutes
);