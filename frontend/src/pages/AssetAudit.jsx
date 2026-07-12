import {useEffect,useState} from "react";
import api from "../services/api";


export default function AssetAudit(){


const user =
JSON.parse(localStorage.getItem("user")) || {};



const isAdmin =
["ADMIN","DEPARTMENT_HEAD"]
.includes(user.role);



const [audits,setAudits]=useState([]);

const [assets,setAssets]=useState([]);

const [history,setHistory]=useState([]);



const [form,setForm]=useState({

department:"",
location:"",
startDate:"",
endDate:"",
auditor:""

});






useEffect(()=>{

loadAudits();
loadAssets();

},[]);






async function loadAudits(){


try{


const res =
await api.get("/audits");


setAudits(res.data);



}

catch(error){

console.log(error);

}


}






async function loadAssets(){


try{


const res =
await api.get("/assets");


setAssets(res.data);



}

catch(error){

console.log(error);

}



}









async function createAudit(){



if(
!form.department ||
!form.location ||
!form.startDate ||
!form.endDate ||
!form.auditor
){

alert("Fill all details");

return;

}



try{


await api.post(

"/audits",

form

);


alert("Audit Created");


setForm({

department:"",
location:"",
startDate:"",
endDate:"",
auditor:""

});


loadAudits();


}


catch(error){

alert(
"Audit creation failed"
);

}


}









async function verifyAsset(id,status){


try{


await api.put(

"/audits/verify/"+id,

{
status
}

);


loadAssets();


}


catch(error){

console.log(error);

}



}








async function closeAudit(id){


try{


await api.put(

"/audits/close/"+id

);


loadAudits();


}


catch(error){

console.log(error);

}


}






const discrepancies =
assets.filter(
a=>
a.auditStatus==="Missing" ||
a.auditStatus==="Damaged"
);









return(


<div className="container-fluid">



<h2 className="fw-bold mb-4">

Asset Audit Management

</h2>







{
isAdmin &&

<div className="card shadow p-4 mb-5">


<h4 className="fw-bold mb-4">

Create Audit Cycle

</h4>





<div className="row">



<div className="col-md-4">

<input

className="form-control mb-3"

placeholder="Department"

value={form.department}

onChange={
e=>setForm({
...form,
department:e.target.value
})
}

/>

</div>






<div className="col-md-4">


<input

className="form-control mb-3"

placeholder="Location"

value={form.location}

onChange={
e=>setForm({
...form,
location:e.target.value
})
}

/>


</div>







<div className="col-md-4">


<input

type="text"

className="form-control mb-3"

placeholder="Auditor Name"

value={form.auditor}

onChange={
e=>setForm({
...form,
auditor:e.target.value
})
}

/>


</div>






<div className="col-md-4">


<input

type="date"

className="form-control mb-3"

value={form.startDate}

onChange={
e=>setForm({
...form,
startDate:e.target.value
})
}

/>


</div>





<div className="col-md-4">


<input

type="date"

className="form-control mb-3"

value={form.endDate}

onChange={
e=>setForm({
...form,
endDate:e.target.value
})
}

/>


</div>




</div>





<button

className="btn btn-primary"

onClick={createAudit}

>

Create Audit

</button>



</div>

}









<h3 className="fw-bold mb-3">

Audit Cycles

</h3>






<table className="table table-bordered table-striped shadow">


<thead className="table-light">

<tr>

<th>
Department
</th>

<th>
Location
</th>

<th>
Date Range
</th>

<th>
Auditor
</th>

<th>
Status
</th>

<th>
Action
</th>


</tr>

</thead>






<tbody>


{

audits.map(a=>(


<tr key={a._id}>


<td>
{a.department}
</td>


<td>
{a.location}
</td>


<td>

{a.startDate}
-
{a.endDate}

</td>


<td>
{a.auditor}
</td>



<td>


<span className={

a.status==="Closed"

?
"badge bg-success"

:

"badge bg-primary"

}>

{a.status}

</span>


</td>




<td>


<button

className="btn btn-danger btn-sm"

disabled={a.status==="Closed"}

onClick={()=>closeAudit(a._id)}

>

Close Audit

</button>


</td>



</tr>


))


}



</tbody>



</table>









<h3 className="fw-bold mt-5 mb-3">

Asset Verification

</h3>






<table className="table table-bordered table-striped">


<thead className="table-light">


<tr>

<th>
Asset
</th>

<th>
Status
</th>

<th>
Action
</th>


</tr>


</thead>






<tbody>


{

assets.map(a=>(


<tr key={a._id}>


<td>
{a.name}
</td>


<td>

{a.auditStatus || "Pending"}

</td>


<td>


<button

className="btn btn-success btn-sm me-2"

onClick={()=>verifyAsset(a._id,"Verified")}

>

Verified

</button>



<button

className="btn btn-danger btn-sm me-2"

onClick={()=>verifyAsset(a._id,"Missing")}

>

Missing

</button>




<button

className="btn btn-warning btn-sm"

onClick={()=>verifyAsset(a._id,"Damaged")}

>

Damaged

</button>



</td>



</tr>


))


}



</tbody>


</table>








<h3 className="fw-bold mt-5 mb-3">

Discrepancy Report

</h3>





<table className="table table-bordered">


<thead>

<tr>

<th>
Asset
</th>

<th>
Issue
</th>


</tr>

</thead>


<tbody>


{

discrepancies.map(a=>(


<tr key={a._id}>


<td>
{a.name}
</td>


<td>

<span className="badge bg-danger">

{a.auditStatus}

</span>


</td>


</tr>


))


}



</tbody>



</table>







</div>


)


}