import {useState} from "react";
import api from "../services/api";


export default function VerifyOTP(){


const [otp,setOtp]=useState("");

const email =
localStorage.getItem(
"resetEmail"
);



async function verify(){


const res =
await api.post(
"/auth/verify-otp",
{
email,
otp
}
);


alert(res.data.message);


window.location="/new-password";


}



return(

<div className="container-fluid vh-100">

<div className="row h-100">


{/* Left Branding Section */}

<div className="
col-lg-7
d-none d-lg-flex
bg-primary
text-white
align-items-center
justify-content-center
">


<div className="text-center">


<h1 className="display-3 fw-bold">
AssetFlow
</h1>


<p className="fs-4">
Enterprise Asset & Resource Management System
</p>


<p>
Secure OTP verification
</p>


</div>


</div>





{/* OTP Section */}

<div className="
col-lg-5
col-md-8
mx-auto
d-flex
align-items-center
">


<div className="
card
shadow-lg
border-0
w-100
">


<div className="card-body p-5">



<h2 className="
text-center
fw-bold
mb-3
">

Verify OTP

</h2>



<p className="
text-center
text-muted
mb-4
">

Enter the OTP sent to your email

</p>




<input

className="
form-control
form-control-lg
mb-4
text-center
"

placeholder="Enter OTP"

maxLength="6"

onChange={
e=>setOtp(e.target.value)
}

/>




<button

className="
btn
btn-primary
btn-lg
w-100
"

onClick={verify}

>

Verify OTP

</button>



<div className="
text-center
mt-4
">


<a href="/forgot-password">

Resend OTP

</a>


</div>



</div>


</div>


</div>



</div>

</div>

)

}