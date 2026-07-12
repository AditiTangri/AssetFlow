const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sendEmail = require("../utils/sendEmail");

// SIGNUP
exports.signup = async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;


        const exists = await User.findOne({ email });


        if (exists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }


        const hashPassword = await bcrypt.hash(password, 10);


        const user = await User.create({

            name,

            email,

            password: hashPassword,

            // Signup always creates Employee
            role: "EMPLOYEE"

        });


        res.json({

            message: "Signup successful",

            user: {
                name: user.name,
                role: user.role
            }

        });


    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};




// LOGIN
exports.login = async (req, res) => {

    console.log("LOGIN API HIT");

    try {

        const {
            email,
            password
        } = req.body;


        console.log("Email received:", email);



        const user = await User.findOne({ email });


        console.log("User found:", user);



        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }


        const validPassword =
            await bcrypt.compare(
                password,
                user.password
            );


        console.log("Password matched:", validPassword);



        if (!validPassword) {

            return res.status(401).json({
                message: "Invalid password"
            });

        }


        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET
        );


        res.json({

            token,

            user: {
                name: user.name,
                role: user.role
            }

        });


    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};



// SEND OTP
exports.sendOTP = async (req, res) => {


    try {


        const { email } = req.body;



        const user =
            await User.findOne({ email });



        if (!user) {

            return res.status(404).json({

                message: "Email not registered"

            });

        }




        const otp =
            Math.floor(
                100000 + Math.random() * 900000
            ).toString();




        user.resetOTP = otp;


        user.otpExpiry =
            Date.now() + 5 * 60 * 1000;



        await user.save();




        await sendEmail(
            email,
            otp
        );



        res.json({

            message: "OTP sent successfully"

        });



    }
    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }


};






// VERIFY OTP
exports.verifyOTP = async (req, res) => {


    try {


        const {
            email,
            otp
        } = req.body;



        const user =
            await User.findOne({ email });



        if (!user) {

            return res.status(404).json({

                message: "User not found"

            });

        }




        if (
            user.resetOTP !== otp ||
            user.otpExpiry < Date.now()
        ) {

            return res.status(400).json({

                message: "Invalid or expired OTP"

            });

        }




        res.json({

            message: "OTP verified successfully"

        });



    }
    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }


};







// RESET PASSWORD
exports.resetPassword = async (req, res) => {


    try {


        const {
            email,
            password
        } = req.body;



        const user =
            await User.findOne({ email });



        if (!user) {

            return res.status(404).json({

                message: "User not found"

            });

        }




        user.password =
            await bcrypt.hash(
                password,
                10
            );



        user.resetOTP = null;

        user.otpExpiry = null;



        await user.save();




        res.json({

            message: "Password changed successfully"

        });



    }
    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }


};