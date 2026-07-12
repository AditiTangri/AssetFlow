import {useEffect,useState} from "react";
import api from "../services/api";


export default function MaintenanceManagement(){


const user =
JSON.parse(
localStorage.getItem("user")
);


const isAdmin =
["ADMIN","DEPARTMENT_HEAD"]
.includes(user?.role);



const [requests,setRequests]=useState([]);



const [form,setForm]=useState({

asset:"",
issue:"",
priority:"",
photo:null

});





useEffect(()=>{

loadRequests();

},[]);





async function loadRequests(){


try{


const res =
await api.get("/maintenance");



let data=res.data;



// EMPLOYEE ONLY OWN REQUESTS

if(!isAdmin){

data =
data.filter(
(item)=>
item.employee === user._id
);

}



setRequests(data);



}

catch(error){

console.log(error);

}


}









// CREATE REQUEST


async function createRequest(){


if(
!form.asset ||
!form.issue ||
!form.priority
){

alert(
"Fill all details"
);

return;

}




try{


const data =
new FormData();



data.append(
"asset",
form.asset
);



data.append(
"issue",
form.issue
);



data.append(
"priority",
form.priority
);



data.append(
"employee",
user._id
);




if(form.photo){

data.append(
"photo",
form.photo
);

}





await api.post(

"/maintenance",

data,

{

headers:{
"Content-Type":
"multipart/form-data"
}

}

);





alert(
"Maintenance request submitted"
);



setForm({

asset:"",
issue:"",
priority:"",
photo:null

});



loadRequests();



}


catch(error){


alert(
"Request failed"
);


}



}









// ADMIN ACTIONS



async function approve(id){


await api.put(
"/maintenance/approve/"+id
);


loadRequests();


}






async function reject(id){


await api.put(
"/maintenance/reject/"+id
);


loadRequests();


}







async function assign(id){



const technician =
prompt(
"Enter technician name"
);



if(!technician)
return;



await api.put(

"/maintenance/assign/"+id,

{
technician
}

);



loadRequests();



}








async function start(id){


await api.put(

"/maintenance/start/"+id

);



loadRequests();


}







async function resolve(id){


await api.put(

"/maintenance/resolve/"+id

);



loadRequests();


}









return (

<div className="container-fluid">


<h2 className="fw-bold mb-4">
Maintenance Management
</h2>





{/* EMPLOYEE ONLY REQUEST FORM */}

{
user?.role==="EMPLOYEE" &&

<div className="card shadow p-4 mb-5">


<h4 className="fw-bold mb-4">
Raise Maintenance Request
</h4>



<div className="row">



<div className="col-md-4">

<input

className="form-control mb-3"

placeholder="Asset Name"

value={form.asset}

onChange={(e)=>

setForm({

...form,

asset:e.target.value

})

}

/>

</div>





<div className="col-md-4">


<select

className="form-control mb-3"

value={form.priority}

onChange={(e)=>

setForm({

...form,

priority:e.target.value

})

}

>


<option value="">
Select Priority
</option>


<option>
Low
</option>


<option>
Medium
</option>


<option>
High
</option>


</select>


</div>





<div className="col-md-4">


<input

type="file"

className="form-control mb-3"

onChange={(e)=>

setForm({

...form,

photo:e.target.files[0]

})

}

/>


</div>





<div className="col-md-12">


<textarea

className="form-control mb-3"

rows="3"

placeholder="Describe Issue"

value={form.issue}

onChange={(e)=>

setForm({

...form,

issue:e.target.value

})

}

/>


</div>




</div>





<button

className="btn btn-primary"

onClick={createRequest}

>

Raise Request

</button>



</div>

}







<h3 className="fw-bold mb-3">

{
isAdmin
?
"All Maintenance Requests"
:
"My Maintenance Requests"
}

</h3>





<table className="table table-bordered table-striped shadow">


<thead className="table-light">


<tr>

<th>
Asset
</th>


<th>
Issue
</th>


<th>
Priority
</th>


<th>
Status
</th>


<th>
Technician
</th>


{
isAdmin &&
<th>
Actions
</th>
}


</tr>


</thead>





<tbody>


{

requests.map(item=>(


<tr key={item._id}>


<td>
{item.asset}
</td>



<td>
{item.issue}
</td>



<td>


<span

className={

item.priority==="High"

?
"badge bg-danger"

:

item.priority==="Medium"

?
"badge bg-warning text-dark"

:

"badge bg-success"

}

>

{item.priority}

</span>


</td>





<td>


<span

className={

item.status==="Resolved"

?
"badge bg-success"

:

item.status==="Rejected"

?
"badge bg-danger"

:

item.status==="In Progress"

?
"badge bg-warning text-dark"

:

item.status==="Approved"

?
"badge bg-primary"

:

"badge bg-secondary"

}

>


{item.status}


</span>


</td>





<td>

{
item.technician || "Not Assigned"
}

</td>





{

isAdmin &&


<td>



<button

className="btn btn-success btn-sm me-2"

onClick={()=>approve(item._id)}

>

Approve

</button>





<button

className="btn btn-danger btn-sm me-2"

onClick={()=>reject(item._id)}

>

Reject

</button>





<button

className="btn btn-info btn-sm me-2"

onClick={()=>assign(item._id)}

>

Assign

</button>





<button

className="btn btn-warning btn-sm me-2"

onClick={()=>start(item._id)}

>

Start

</button>





<button

className="btn btn-dark btn-sm"

onClick={()=>resolve(item._id)}

>

Resolve

</button>



</td>


}



</tr>


))


}


</tbody>


</table>





</div>

);


}