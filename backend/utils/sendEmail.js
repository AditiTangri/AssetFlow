const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({

    host:"smtp.ethereal.email",

    port:587,

    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }

});


module.exports = async function sendEmail(email, otp){

    const info = await transporter.sendMail({

        from:"AssetFlow <no-reply@assetflow.com>",

        to:email,

        subject:"AssetFlow Password Reset OTP",

        text:
        `Your AssetFlow OTP is ${otp}. It is valid for 5 minutes.`

    });


    console.log(
        "Email preview:",
        nodemailer.getTestMessageUrl(info)
    );

};