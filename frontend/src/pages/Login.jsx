import { useState } from "react";
import api from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";


export default function Login(){

const [form,setForm]=useState({
    email:"",
    password:""
});


async function login(){

try{

const res = await api.post(
"/auth/login",
form
);


localStorage.setItem(
"token",
res.data.token
);


localStorage.setItem(
"user",
JSON.stringify(res.data.user)
);


alert("Login Successful");

window.location="/dashboard";

}
catch(error){

alert(
error.response.data.message
);

}

}



return (

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
Track assets. Manage resources.
Simplify operations.
</p>


</div>


</div>



{/* Login Section */}

<div className="
col-lg-5
col-md-8
mx-auto
d-flex
align-items-center
">


<div className="card shadow-lg border-0 w-100">


<div className="card-body p-5">


<h2 className="text-center fw-bold mb-3">

Welcome Back

</h2>


<p className="text-center text-muted mb-4">

Login to AssetFlow

</p>



<div className="mb-3">


<label className="form-label">

Email

</label>


<input

type="email"

className="form-control form-control-lg"

placeholder="Enter email"

onChange={(e)=>
setForm({

...form,

email:e.target.value

})
}

/>


</div>




<div className="mb-4">


<label className="form-label">

Password

</label>


<input

type="password"

className="form-control form-control-lg"

placeholder="Enter password"

onChange={(e)=>
setForm({

...form,

password:e.target.value

})
}

/>


</div>



<button

className="
btn
btn-primary
btn-lg
w-100
"

onClick={login}

>

Login

</button>



<div className="text-center mt-4">


<p className="text-muted">

Don't have an account?

</p>


<a href="/signup">

Create Account

</a>
<br/><br/>
<a href="/forgot-password">
Forgot Password?
</a>

</div>



</div>


</div>


</div>


</div>


</div>

);

}