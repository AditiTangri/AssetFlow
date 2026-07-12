import { useState } from "react";
import api from "../services/api";


export default function Signup(){


const [form,setForm]=useState({

    name:"",
    email:"",
    password:""

});


async function signup(){

try{


const res = await api.post(
"/auth/signup",
form
);


alert(res.data.message);


window.location="/";


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



{/* Left Section */}

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

Enterprise Asset & Resource Management

</p>


<p className="mt-3">

Create your employee account and start managing resources.

</p>


</div>


</div>




{/* Signup Card */}

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

Create Account

</h2>



<p className="
text-center
text-muted
mb-4
">

Join AssetFlow

</p>




{/* Name */}

<div className="mb-3">


<label className="form-label">

Full Name

</label>


<input

type="text"

className="form-control form-control-lg"

placeholder="Enter your name"

onChange={(e)=>

setForm({

...form,

name:e.target.value

})

}

/>


</div>




{/* Email */}

<div className="mb-3">


<label className="form-label">

Email Address

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





{/* Password */}

<div className="mb-4">


<label className="form-label">

Password

</label>


<input

type="password"

className="form-control form-control-lg"

placeholder="Create password"

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

onClick={signup}

>

Create Account

</button>




<div className="
text-center
mt-4
">


<p className="text-muted">

Already have an account?

</p>


<a href="/">

Login

</a>


</div>




</div>


</div>


</div>


</div>


</div>


);

}