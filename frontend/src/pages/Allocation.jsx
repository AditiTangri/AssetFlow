import {useEffect,useState} from "react";
import api from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";


export default function Allocation(){


const [data,setData]=useState([]);

const [assets,setAssets]=useState([]);

const [employees,setEmployees]=useState([]);

const [transfers,setTransfers]=useState([]);


const [transferData,setTransferData]=useState(null);



const [form,setForm]=useState({

asset:"",
employee:"",
expectedReturnDate:""

});




// LOAD ALL DATA

async function load(){

try{


const allocation =
await api.get("/allocation");


setData(allocation.data);




const transfer =
await api.get("/transfer");


setTransfers(transfer.data);




const assetRes =
await api.get("/assets");


setAssets(assetRes.data);




const empRes =
await api.get("/organization/employees");


setEmployees(empRes.data);



}

catch(error){

console.log(error);

}

}



useEffect(()=>{

load();

},[]);






// ALLOCATE ASSET

async function allocate(){

try{


await api.post(

"/allocation/allocate",

form

);



alert(
"Asset Allocated Successfully"
);



setForm({

asset:"",
employee:"",
expectedReturnDate:""

});



setTransferData(null);


load();


}

catch(error){


const response =
error.response?.data;



console.log(response);



if(response?.conflict){


setTransferData({

asset:form.asset,

holder:response.holder,

toEmployee:form.employee

});


return;


}



alert(

response?.message ||

"Allocation Failed"

);


}

}







// CREATE TRANSFER REQUEST

async function requestTransfer(){


try{


await api.post(

"/transfer/request",

{

asset:transferData.asset,

fromEmployee:
transferData.holder._id,

toEmployee:
transferData.toEmployee

}

);



alert(
"Transfer Request Sent"
);



setTransferData(null);



load();


}

catch(error){


console.log(error.response?.data);



alert(

error.response?.data?.message ||

"Transfer Failed"

);


}


}








// RETURN ASSET

async function returnAsset(id){


try{


await api.put(

"/allocation/return/"+id,

{

notes:"Returned by employee"

}

);



alert(
"Asset Returned"
);



load();


}

catch(error){


alert(

error.response?.data?.message ||

"Return Failed"

);


}


}









return(

<div className="container-fluid">



<h2 className="fw-bold mb-4">

Asset Allocation

</h2>







<div className="card shadow p-4 mb-4">


<h5>
Allocate Asset
</h5>






<select

className="form-control mb-3"

value={form.asset}

onChange={e=>

setForm({

...form,

asset:e.target.value

})

}

>


<option value="">

Select Asset

</option>



{

assets.map(a=>(


<option

key={a._id}

value={a._id}

>

{a.assetTag} - {a.name}

</option>


))

}


</select>








<select

className="form-control mb-3"

value={form.employee}

onChange={e=>

setForm({

...form,

employee:e.target.value

})

}

>


<option value="">

Select Employee

</option>



{

employees.map(e=>(


<option

key={e._id}

value={e._id}

>

{e.name}

</option>


))

}


</select>







<input

type="date"

className="form-control mb-3"

value={form.expectedReturnDate}

onChange={e=>

setForm({

...form,

expectedReturnDate:e.target.value

})

}

/>







<button

className="btn btn-primary"

onClick={allocate}

>

Allocate Asset

</button>







{

transferData &&


<div className="alert alert-warning mt-4">


<h6>
Asset Already Allocated
</h6>



<p>

Currently held by:

<strong>

{" "}

{transferData.holder?.name}

</strong>

</p>




<button

className="btn btn-danger"

onClick={requestTransfer}

>

Transfer Request

</button>



</div>


}



</div>









<h4>

Current Allocations

</h4>





<table className="table table-bordered table-striped">


<thead>

<tr>


<th>
Asset Tag
</th>


<th>
Asset Name
</th>


<th>
Employee
</th>


<th>
Expected Return
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

data.map(a=>(


<tr key={a._id}>


<td>

{a.asset?.assetTag}

</td>



<td>

{a.asset?.name}

</td>




<td>

{a.employee?.name}

</td>






<td>

{

a.expectedReturnDate &&

new Date(a.expectedReturnDate)

.toLocaleDateString()

}

</td>







<td>


{

a.expectedReturnDate &&

new Date(a.expectedReturnDate)<new Date()

&&

a.status==="ACTIVE"


?


<span className="badge bg-danger">

OVERDUE

</span>


:


<span className="badge bg-success">

{a.status}

</span>


}


</td>







<td>


{

a.status==="ACTIVE" &&


<button

className="btn btn-danger btn-sm"

onClick={()=>returnAsset(a._id)}

>

Return

</button>


}


</td>




</tr>


))


}



</tbody>


</table>










<h4 className="mt-5">
Transfer Requests
</h4>



<table className="table table-bordered table-striped">


<thead>

<tr>

<th>
Asset
</th>

<th>
From
</th>

<th>
To
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

transfers.map(t=>(


<tr key={t._id}>


<td>

{t.asset?.assetTag}

</td>



<td>

{t.fromEmployee?.name}

</td>



<td>

{t.toEmployee?.name}

</td>



<td>


<span

className={
t.status==="APPROVED"
?
"badge bg-success"
:
"badge bg-warning"
}

>

{t.status}

</span>


</td>




<td>


{

t.status==="REQUESTED" &&


<button
className="btn btn-success btn-sm"
onClick={async()=>{

try{

await api.put(
"/transfer/approve/"+t._id
);


alert("Transfer Approved");


load();


}

catch(error){

alert(
error.response?.data?.message ||
"Approval Failed"
);

}

}}
>
Approve
</button>

}



</td>



</tr>


))


}


</tbody>


</table>



<h3>Allocation History</h3>

<table className="table table-bordered">


<thead>

<tr>

<th>
Asset
</th>

<th>
From
</th>

<th>
To
</th>

<th>
Status
</th>


</tr>

</thead>





<tbody>


{

transfers.map(t=>(


<tr key={t._id}>


<td>

{t.asset?.assetTag}

</td>



<td>

{t.fromEmployee?.name}

</td>



<td>

{t.toEmployee?.name}

</td>



<td>

<span className="badge bg-warning">

{t.status}

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