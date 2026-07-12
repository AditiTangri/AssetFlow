import {
BrowserRouter,
Routes,
Route
} from "react-router-dom";


import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import NewPassword from "./pages/NewPassword";
import Dashboard from "./pages/Dashboard";
import MaintenanceManagement from "./pages/MaintenanceManagement";

import AssetAudit from "./pages/AssetAudit";


import Layout from "./pages/Layout";
import ResourceBooking from "./pages/ResourceBooking";
import Organization from "./pages/Organization";

import Assets from "./pages/Assets";
import Allocation from "./pages/Allocation";


export default function App(){

return (

<BrowserRouter>

<Routes>


<Route 
path="/"
element={<Login/>}
/>
<Route
path="/dashboard"
element={
<Layout>
<Dashboard/>
</Layout>
}
/>
<Route
path="/asset-audit"
element={<Layout><AssetAudit/></Layout>}
/>
<Route
path="/maintenance"
element={
<Layout>
<MaintenanceManagement/>
</Layout>
}
/>
<Route
path="/organization"
element={
  <Layout>
    <Organization/>
  </Layout>

}
/>
<Route
path="/resource-booking"
element={
  <Layout>
    <ResourceBooking/>
  </Layout>

}
/>
<Route
path="/signup"
element={<Signup/>}
/>
<Route
path="/allocation"
element={<Layout><Allocation/></Layout>}
/>
<Route
path="/assets"
element={
<Layout><Assets/></Layout>}
/>

<Route
path="/forgot-password"
element={<ForgotPassword/>}
/>


<Route
path="/verify-otp"
element={<VerifyOTP/>}
/>


<Route
path="/new-password"
element={<NewPassword/>}
/>


</Routes>

</BrowserRouter>

);

}