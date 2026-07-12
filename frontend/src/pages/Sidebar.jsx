import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from "react-router-dom";
function Sidebar() {


const user =
JSON.parse(
localStorage.getItem("user")
);

console.log("Logged User:", user);
console.log("Role:", user?.role);
const navigate = useNavigate();


const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/");

};
return (

<div
className="
bg-primary
text-white
min-vh-100
p-4
"
style={{
width:"260px"
}}
>


<h1 className="
fw-bold
mb-5
">

AssetFlow

</h1>




<ul className="
nav
flex-column
gap-3
">



<li className="nav-item">

<Link
to="/dashboard"
className="nav-link text-white fs-5"
>

<i className="bi bi-grid me-2"></i>

Dashboard

</Link>

</li>





{/* ONLY ADMIN */}

{
  ["ADMIN", "DEPARTMENT_HEAD"].includes(user?.role) && (
    <li className="nav-item">
      <Link
        to="/organization"
        className="nav-link text-white fs-5"
      >
        <i className="bi bi-building me-2"></i>
        Organization
      </Link>
    </li>
  )
}



{
  ["ADMIN", "DEPARTMENT_HEAD"].includes(user?.role) && (
    <li className="nav-item">
      <Link
        to="/allocation"
        className="nav-link text-white fs-5"
      >
        <i className="bi bi-building me-2"></i>
        Allocation
      </Link>
    </li>
  )
}
{
  ["ADMIN", "DEPARTMENT_HEAD"].includes(user?.role) && (
    <li className="nav-item">
      <Link
        to="/asset-audit"
        className="nav-link text-white fs-5"
      >
        <i className="bi bi-building me-2"></i>
        Asset Audit
      </Link>
    </li>
  )
}
<li className="nav-item">

<Link
to="/assets"
className="nav-link text-white fs-5"
>

<i className="bi bi-box-seam me-2"></i>

Assets

</Link>

</li>






<li className="nav-item">

<Link
to="/resource-booking"
className="nav-link text-white fs-5"
>

<i className="bi bi-calendar-check me-2"></i>

Bookings

</Link>

</li>






<li className="nav-item">

<Link
to="/maintenance"
className="nav-link text-white fs-5"
>

<i className="bi bi-tools me-2"></i>

Maintenance

</Link>

</li>






<li className="nav-item">

<Link
to="/reports"
className="nav-link text-white fs-5"
>

<i className="bi bi-bar-chart me-2"></i>

Reports

</Link>

</li>

<button

onClick={handleLogout}

className="
w-full
flex
items-center
justify-center
gap-2
text-white
font-semibold
py-3
rounded-lg
transition
duration-300
shadow-md
"

style={{
backgroundColor:"#dc2626"
}}

>

🚪 Logout

</button>



</ul>



</div>

);

}


export default Sidebar;