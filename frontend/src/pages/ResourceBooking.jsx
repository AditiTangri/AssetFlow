import {useEffect,useState} from "react";
import api from "../services/api";


export default function ResourceBooking(){


const user =
JSON.parse(localStorage.getItem("user")) || {};



const [bookings,setBookings]=useState([]);


const [booking,setBooking]=useState({

resource:"",
employee:"",
date:"",
startTime:"",
endTime:""

});




// Load bookings

useEffect(()=>{

loadBookings();

},[]);




async function loadBookings(){

try{

const res =
await api.get("/bookings");

setBookings(res.data);


}
catch(error){

console.log(error);

}

}







// Create Booking

async function createBooking(){


if(
!booking.resource ||
!booking.date ||
!booking.startTime ||
!booking.endTime
){

alert("Fill all details");

return;

}



if(
booking.startTime >= booking.endTime
){

alert("Invalid time range");

return;

}



try{


await api.post(

"/bookings",

{

resource:booking.resource,

employee:booking.employee,

date:booking.date,

startTime:booking.startTime,

endTime:booking.endTime

}

);



alert(
"Booking Created"
);



setBooking({

resource:"",
date:"",
startTime:"",
endTime:""

});



loadBookings();



}

catch(error){

console.log(error.response);


alert(

error.response?.data?.message ||

"Booking failed"

);


}



}







// Cancel Booking


async function cancelBooking(id){


try{


await api.put(

"/bookings/cancel/"+id

);


loadBookings();


}

catch(error){

console.log(error);

}


}







// Reschedule


async function reschedule(item){


const date =
prompt(
"New Date",
item.date
);



const start =
prompt(
"Start Time",
item.startTime
);



const end =
prompt(
"End Time",
item.endTime
);



if(!date || !start || !end)
return;



await api.put(

"/bookings/"+item._id,

{

date,

startTime:start,

endTime:end,

status:"Upcoming"

}

);



loadBookings();


}







function getStatus(item){


if(item.status==="Cancelled")

return "Cancelled";



const now =
new Date();



const start =
new Date(
`${item.date}T${item.startTime}`
);



const end =
new Date(
`${item.date}T${item.endTime}`
);



if(now < start)

return "Upcoming";



if(now>=start && now<=end)

return "Ongoing";



return "Completed";


}









return(

<div className="container-fluid">



<h2 className="fw-bold mb-4">

Resource Booking

</h2>







<div className="card shadow p-4 mb-5">



<h4 className="fw-bold mb-4">

Book Resource

</h4>




<div className="row">





<div className="col-md-4">


<input

className="form-control mb-3"

placeholder="Resource Name"

value={booking.resource}

onChange={e=>

setBooking({

...booking,

resource:e.target.value

})

}

/>


</div>



<input

className="form-control mb-3"

placeholder="Employee Name"

value={booking.employee}

onChange={(e)=>

setBooking({

...booking,

employee:e.target.value

})

}

/>



<div className="col-md-4">


<input

type="date"

className="form-control mb-3"

value={booking.date}

onChange={e=>

setBooking({

...booking,

date:e.target.value

})

}

/>


</div>







<div className="col-md-4">


<input

type="time"

className="form-control mb-3"

value={booking.startTime}

onChange={e=>

setBooking({

...booking,

startTime:e.target.value

})

}

/>


</div>








<div className="col-md-4">


<input

type="time"

className="form-control mb-3"

value={booking.endTime}

onChange={e=>

setBooking({

...booking,

endTime:e.target.value

})

}

/>


</div>






</div>







<button

className="
btn
btn-primary
px-4
"

onClick={createBooking}

>

Create Booking

</button>



</div>









<h3 className="fw-bold mb-3">

Resource Calendar

</h3>





<div className="row mb-5">



{

bookings.map(b=>(


<div

className="col-md-4 mb-3"

key={b._id}

>


<div className="card shadow p-3">


<h5 className="fw-bold text-primary">

{b.resource}

</h5>



<p>

📅 {b.date}

</p>



<p>

⏰ {b.startTime} - {b.endTime}

</p>



<span className="badge bg-info">

{getStatus(b)}

</span>



</div>



</div>


))

}



</div>










<h3 className="fw-bold">

Booking Records

</h3>





<table className="table table-bordered table-striped shadow mt-3">


<thead className="table-light">


<tr>

<th>
Resource
</th>

<th>
Employee
</th>

<th>
Date
</th>

<th>
Time
</th>

<th>
Status
</th>

<th>
Actions
</th>


</tr>


</thead>





<tbody>


{

bookings.map(b=>(


<tr key={b._id}>


<td>
{b.resource}
</td>



<td>

{
b.employee?.name ||
b.employee

}

</td>




<td>
{b.date}
</td>



<td>

{b.startTime} -
{b.endTime}

</td>




<td>


<span className="badge bg-success">

{getStatus(b)}

</span>


</td>






<td>


<button

className="btn btn-danger btn-sm me-2"

onClick={()=>cancelBooking(b._id)}

>

Cancel

</button>





<button

className="btn btn-warning btn-sm"

onClick={()=>reschedule(b)}

>

Reschedule

</button>


</td>



</tr>


))

}



</tbody>


</table>





</div>

);


}