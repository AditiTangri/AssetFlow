import {useEffect,useState} from "react";
import api from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";


export default function Dashboard(){


const [stats,setStats]=useState({});


const [overdue,setOverdue]=useState([]);

const [upcoming,setUpcoming]=useState([]);



useEffect(()=>{


loadDashboard();


},[]);



async function loadDashboard(){


const s =
await api.get(
"/dashboard/stats"
);


setStats(
s.data
);



const o =
await api.get(
"/dashboard/overdue"
);


setOverdue(
o.data
);



const u =
await api.get(
"/dashboard/upcoming"
);


setUpcoming(
u.data
);


}





return(

<div className="container-fluid p-4">


<h2 className="fw-bold mb-4">
AssetFlow Dashboard
</h2>



<div className="row g-4">


<KPI
title="Assets Available"
value={stats.available}
color="success"
/>


<KPI
title="Assets Allocated"
value={stats.allocated}
color="primary"
/>


<KPI
title="Maintenance Today"
value={stats.maintenance}
color="warning"
/>


<KPI
title="Active Bookings"
value={stats.bookings}
color="info"
/>


<KPI
title="Pending Transfers"
value={stats.transfers}
color="danger"
/>


<KPI
title="Upcoming Returns"
value={stats.upcomingReturns}
color="secondary"
/>



</div>





<div className="row mt-5">


<div className="col-md-6">


<div className="card shadow border-danger">


<div className="card-header bg-danger text-white">

Overdue Returns

</div>


<div className="card-body">


{
overdue.length===0 ?

<p>
No overdue returns
</p>

:

overdue.map(a=>(

<div
key={a._id}
className="border-bottom p-2"
>

{a.name}

<br/>

<small>
Return Date:
{new Date(
a.expectedReturnDate
).toDateString()}
</small>


</div>


))

}


</div>

</div>


</div>





<div className="col-md-6">


<div className="card shadow">


<div className="card-header">

Upcoming Returns

</div>


<div className="card-body">


{
upcoming.map(a=>(

<p key={a._id}>

{a.name}

</p>

))
}


</div>

</div>


</div>


</div>





<div className="mt-5">


<h4>
Quick Actions
</h4>



<button className="btn btn-primary m-2">

Register Asset

</button>



<button className="btn btn-success m-2">

Book Resource

</button>



<button className="btn btn-warning m-2">

Raise Maintenance Request

</button>



</div>



</div>


)

}




function KPI({title,value,color}){


return(

<div className="col-lg-4 col-md-6">


<div className={`card shadow border-${color}`}>


<div className="card-body">


<h6 className="text-muted">

{title}

</h6>


<h2 className={`text-${color} fw-bold`}>

{value || 0}

</h2>


</div>


</div>


</div>


)

}