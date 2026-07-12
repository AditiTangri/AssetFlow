import {useEffect,useState} from "react";
import api from "../services/api";


export default function Assets(){


const [assets,setAssets]=useState([]);

const [categories,setCategories]=useState([]);
const [newCategory,setNewCategory]=useState("");
const [search,setSearch]=useState("");


const [form,setForm]=useState({

name:"",
category:"",
serialNumber:"",
acquisitionDate:"",
acquisitionCost:"",
condition:"Good",
location:"",
shared:false,
photo:null

});



useEffect(()=>{

load();
loadCategories();

},[search]);



async function load(){

const res =
await api.get(
"/assets?search="+search
);

setAssets(res.data);

}




async function loadCategories(){

const res =
await api.get(
"/organization/categories"
);

setCategories(res.data);

}




async function registerAsset(){

console.log("Register clicked");

console.log(form);

try{


const data=new FormData();


Object.keys(form).forEach(key=>{

data.append(
key,
form[key]
);

});



const res=
await api.post(
"/assets",
data,
{
headers:{
"Content-Type":"multipart/form-data"
}
}
);


console.log(res.data);


alert("Asset Registered");


load();


}
catch(error){

console.log(error.response);

alert(
error.response?.data?.message ||
"Error registering asset"
);

}


}





return(


<div className="container-fluid">


<h2 className="fw-bold mb-4">
Register Asset
</h2>



<div className="card shadow p-4 mb-5">


<div className="row">



<div className="col-md-4">

<input

className="form-control mb-3"

placeholder="Asset Name"

onChange={
e=>setForm({
...form,
name:e.target.value
})
}

/>

</div>




<div className="col-md-4">

<select

className="form-control mb-3"

value={form.category}

onChange={
e=>setForm({
...form,
category:e.target.value
})
}

>

<option value="">
Select Category
</option>


{
categories.map(c=>(

<option
key={c._id}
value={c._id}
>

{c.name}

</option>

))

}


<option value="new">
+ Add New Category
</option>


</select>



{
form.category==="new" &&

<div>


<input

className="form-control mb-2"

placeholder="Enter new category"

value={newCategory}

onChange={
e=>setNewCategory(e.target.value)
}

/>



<button

className="btn btn-success mb-3"

onClick={async()=>{


const res =
await api.post(
"/organization/categories",
{
name:newCategory,
status:"Active"
}
);



setCategories([
...categories,
res.data
]);



setForm({

...form,

category:res.data._id

});



setNewCategory("");



}}

>

Create Category

</button>


</div>

}


</div>




<div className="col-md-4">

<input

className="form-control mb-3"

placeholder="Serial Number"

onChange={
e=>setForm({
...form,
serialNumber:e.target.value
})
}

/>

</div>




<div className="col-md-4">

<input

type="date"

className="form-control mb-3"

onChange={
e=>setForm({
...form,
acquisitionDate:e.target.value
})
}

/>

</div>




<div className="col-md-4">

<input

type="number"

className="form-control mb-3"

placeholder="Acquisition Cost"

onChange={
e=>setForm({
...form,
acquisitionCost:e.target.value
})
}

/>

</div>




<div className="col-md-4">

<input

className="form-control mb-3"

placeholder="Location"

onChange={
e=>setForm({
...form,
location:e.target.value
})
}

/>

</div>




<div className="col-md-4">

<select

className="form-control mb-3"

onChange={
e=>setForm({
...form,
condition:e.target.value
})
}

>

<option>Good</option>
<option>New</option>
<option>Damaged</option>

</select>


</div>




<div className="col-md-4">

<input

className="form-control mb-3"

value="Pending"

disabled

/>

<small className="text-muted">
Status is automatically managed
</small>

</div>





<div className="col-md-4">


<input

type="file"

accept="image/png,image/jpeg"

className="form-control mb-3"

onChange={
e=>setForm({
...form,
photo:e.target.files[0]
})
}

/>


</div>



<div className="col-md-4">


<div className="form-check">


<input

type="checkbox"

className="form-check-input"

onChange={
e=>setForm({
...form,
shared:e.target.checked
})
}

/>


<label>
Shared / Bookable
</label>


</div>


</div>



</div>



<button

className="btn btn-primary"

onClick={registerAsset}

>

Register Asset

</button>


</div>





<h2 className="fw-bold">
Asset Directory
</h2>



<input

className="form-control mb-4"

placeholder="Search Asset Tag / Serial / Location"

onChange={
e=>setSearch(e.target.value)
}

/>





<table className="table table-bordered table-striped">


<thead>

<tr>

<th>Photo</th>
<th>QR</th>
<th>Asset Tag</th>
<th>Name</th>
<th>Category</th>
<th>Serial No</th>
<th>Date</th>
<th>Cost</th>
<th>Condition</th>
<th>Location</th>
<th>Status</th>
<th>Bookable</th>

</tr>

</thead>



<tbody>


{
assets.map(a=>(

<tr key={a._id}>


<td>

{
a.photo &&
<img
src={
"http://localhost:5000/"+a.photo
}
width="80"
/>
}

</td>



<td>

<img
src={a.qrCode}
width="80"
/>

</td>



<td>{a.assetTag}</td>

<td>{a.name}</td>

<td>{a.category?.name}</td>

<td>{a.serialNumber}</td>


<td>
{
a.acquisitionDate &&
new Date(a.acquisitionDate)
.toLocaleDateString()
}
</td>


<td>
₹ {a.acquisitionCost}
</td>


<td>
{a.condition}
</td>


<td>
{a.location}
</td>


<td>

<span

className={

a.status==="Available"
?
"badge bg-success"

:

a.status==="Allocated"
?
"badge bg-primary"

:

a.status==="Reserved"
?
"badge bg-info"

:

a.status==="Under Maintenance"
?
"badge bg-warning text-dark"

:

a.status==="Lost"
?
"badge bg-danger"

:

"badge bg-secondary"

}

>

{a.status}

</span>


</td>


<td>
{
a.shared?"YES":"NO"
}
</td>


</tr>

))

}


</tbody>


</table>



</div>


)

}