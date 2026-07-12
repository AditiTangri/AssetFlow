import {useState} from "react";
import api from "../services/api";


export default function ForgotPassword(){


const [email,setEmail]=useState("");



async function sendOTP(){


const res=
await api.post(
"/auth/send-otp",
{
email
}
);


alert(res.data.message);


localStorage.setItem(
"resetEmail",
email
);


window.location="/verify-otp";


}



return (

<div className="container-fluid vh-100">

<div className="row h-100">


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
Password Recovery
</p>


</div>


</div>



<div className="
col-lg-5
d-flex
align-items-center
">


<div className="card shadow-lg border-0 w-100">

<div className="card-body p-5">


<h2 className="text-center fw-bold">

Forgot Password

</h2>


<p className="text-muted text-center">

Enter registered email

</p>



<input

className="form-control form-control-lg my-4"

placeholder="Email"

onChange={
e=>setEmail(e.target.value)
}

/>



<button

className="btn btn-primary btn-lg w-100"

onClick={sendOTP}

>

Send OTP

</button>



</div>

</div>


</div>


</div>

</div>

)

}