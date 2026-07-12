import {useEffect,useState} from "react";
import api from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";


export default function Organization(){


const [tab,setTab]=useState("department");


return(

<div className="container-fluid">


<h2 className="fw-bold mb-4">
Organization Setup
</h2>



<ul className="nav nav-tabs">


<li className="nav-item">

<button
className={tab==="department"?"nav-link active":"nav-link"}
onClick={()=>setTab("department")}
>
Departments
</button>

</li>



<li className="nav-item">

<button
className={tab==="category"?"nav-link active":"nav-link"}
onClick={()=>setTab("category")}
>
Categories
</button>

</li>



<li className="nav-item">

<button
className={tab==="employee"?"nav-link active":"nav-link"}
onClick={()=>setTab("employee")}
>
Employees
</button>

</li>


</ul>




<div className="card mt-4 shadow">

<div className="card-body">


{
tab==="department" &&
<Departments/>
}


{
tab==="category" &&
<Categories/>
}


{
tab==="employee" &&
<Employees/>
}


</div>

</div>



</div>

)

}






function Departments(){

const [data,setData]=useState([]);

const [employees,setEmployees]=useState([]);

const [form,setForm]=useState({

name:"",
head:"",
parent:"",
status:"Active"

});


const [editId,setEditId]=useState(null);



useEffect(()=>{

load();

loadEmployees();

},[]);



async function load(){

const res=
await api.get(
"/organization/departments"
);

setData(res.data);

}



async function loadEmployees(){

const res=
await api.get(
"/organization/employees"
);


setEmployees(res.data);

}




async function save(){


if(editId){


await api.put(

`/organization/departments/${editId}`,

form

);


}
else{


await api.post(

"/organization/departments",

form

);


}



setForm({

name:"",
head:"",
parent:"",
status:"Active"

});


setEditId(null);


load();


}





function edit(d){


setEditId(d._id);


setForm({

name:d.name,

head:d.head?._id || "",

parent:d.parent?._id || "",

status:d.status

});


}





async function deactivate(id,status){


await api.put(

`/organization/departments/${id}`,

{

status:
status==="Active"
?
"Inactive"
:
"Active"

}

);


load();


}




return(

<div>


<h4>
Department Management
</h4>



<input

className="form-control mb-2"

placeholder="Department Name"

value={form.name}

onChange={
e=>
setForm({
...form,
name:e.target.value
})
}

/>



<select

className="form-select mb-2"

value={form.head}

onChange={
e=>
setForm({
...form,
head:e.target.value
})
}

>


<option>
Assign Department Head
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





<select

className="form-select mb-2"

value={form.parent}

onChange={
e=>
setForm({
...form,
parent:e.target.value
})
}

>


<option value="">

No Parent Department

</option>


{
data.map(d=>(

<option

key={d._id}

value={d._id}

>

{d.name}

</option>

))
}


</select>





<button

className="btn btn-primary mb-3"

onClick={save}

>

{
editId
?
"Update Department"
:
"Add Department"
}


</button>





<table className="table">


<thead>

<tr>

<th>Name</th>

<th>Head</th>

<th>Parent</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>



<tbody>


{
data.map(d=>(

<tr key={d._id}>


<td>
{d.name}
</td>


<td>
{
d.head?
d.head.name
:
"-"
}
</td>


<td>
{
d.parent?
d.parent.name
:
"-"
}
</td>



<td>

<span

className={
d.status==="Active"
?
"badge bg-success"
:
"badge bg-danger"
}

>

{d.status}

</span>

</td>



<td>


<button

className="btn btn-warning btn-sm me-2"

onClick={()=>edit(d)}

>

Edit

</button>




<button

className="btn btn-secondary btn-sm"

onClick={()=>
deactivate(
d._id,
d.status
)
}

>

{
d.status==="Active"
?
"Deactivate"
:
"Activate"
}

</button>


</td>


</tr>

))

}


</tbody>


</table>


</div>

)


}







function Categories(){


const [categories,setCategories]=useState([]);


const [form,setForm]=useState({

name:"",
description:"",
warrantyPeriod:"",
status:"Active"

});


const [editId,setEditId]=useState(null);




useEffect(()=>{

load();

},[]);





async function load(){

const res=
await api.get(
"/organization/categories"
);


setCategories(res.data);


}





async function save(){


if(editId){


await api.put(

`/organization/categories/${editId}`,

form

);


}
else{


await api.post(

"/organization/categories",

form

);


}



setForm({

name:"",
description:"",
warrantyPeriod:"",
status:"Active"

});


setEditId(null);


load();


}






function edit(c){


setEditId(c._id);


setForm({

name:c.name,

description:c.description || "",

warrantyPeriod:c.warrantyPeriod || "",

status:c.status

});


}





return(

<div>


<h4>
Asset Category Management
</h4>




<div className="card p-3 mb-4 shadow-sm">


<div className="row g-2">


<div className="col-md-4">

<input

className="form-control"

placeholder="Category Name"

value={form.name}

onChange={
e=>setForm({

...form,

name:e.target.value

})
}

/>

</div>



<div className="col-md-4">

<input

className="form-control"

placeholder="Warranty Years"

type="number"

value={form.warrantyPeriod}

onChange={
e=>setForm({

...form,

warrantyPeriod:e.target.value

})
}

/>

</div>



<div className="col-md-4">

<input

className="form-control"

placeholder="Description"

value={form.description}

onChange={
e=>setForm({

...form,

description:e.target.value

})
}

/>

</div>


</div>



<button

className="btn btn-primary mt-3"

onClick={save}

>

{
editId
?
"Update Category"
:
"Add Category"
}

</button>



</div>






<table className="table table-bordered">


<thead className="table-primary">

<tr>

<th>Name</th>
<th>Warranty</th>
<th>Description</th>
<th>Status</th>
<th>Action</th>

</tr>

</thead>



<tbody>


{
categories.map(c=>(


<tr key={c._id}>


<td>
{c.name}
</td>


<td>

{c.warrantyPeriod}
Years

</td>


<td>

{c.description}

</td>


<td>

<span className="badge bg-success">

{c.status}

</span>

</td>



<td>


<button

className="btn btn-warning btn-sm"

onClick={()=>edit(c)}

>

Edit

</button>


</td>



</tr>


))

}


</tbody>


</table>



</div>

)

}








function Employees(){

const [users,setUsers]=useState([]);


const [departments,setDepartments]=useState([]);



useEffect(()=>{

load();

loadDepartments();

},[]);



async function load(){

const res=
await api.get(
"/organization/employees"
);

setUsers(res.data);

}



async function loadDepartments(){

const res=
await api.get(
"/organization/departments"
);

setDepartments(res.data);

}



async function update(id,data){


await api.put(

`/organization/employees/${id}`,

data

);


alert(
"Employee updated"
);


load();


}




return(

<div>


<h4 className="mb-3">

Employee Directory

</h4>




<table className="table table-bordered">


<thead className="table-dark">

<tr>

<th>Name</th>

<th>Email</th>

<th>Department</th>

<th>Role</th>

<th>Status</th>

<th>Action</th>


</tr>

</thead>



<tbody>


{
users.map(u=>(


<tr key={u._id}>


<td>

{u.name}

</td>


<td>

{u.email}

</td>



<td>


<select

className="form-select"

value={
u.department?._id || ""
}

onChange={
e=>

update(
u._id,
{
department:e.target.value,
role:u.role,
status:u.status
}
)

}

>


<option value="">

No Department

</option>


{
departments.map(d=>(

<option

key={d._id}

value={d._id}

>

{d.name}

</option>

))

}


</select>


</td>





<td>


<select

className="form-select"

value={u.role}

onChange={
e=>

update(
u._id,
{

department:
u.department?._id,

role:e.target.value,

status:u.status

}

)

}

>


<option value="EMPLOYEE">

Employee

</option>


<option value="DEPARTMENT_HEAD">

Department Head

</option>


<option value="ASSET_MANAGER">

Asset Manager

</option>


</select>


</td>






<td>


<select

className="form-select"

value={u.status}

onChange={
e=>

update(
u._id,
{

department:
u.department?._id,

role:u.role,

status:e.target.value

}

)

}

>


<option>

Active

</option>


<option>

Inactive

</option>


</select>


</td>





<td>


<span

className={
u.status==="Active"
?
"badge bg-success"
:
"badge bg-danger"
}

>

{u.status}

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