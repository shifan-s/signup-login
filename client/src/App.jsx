import { Routes, Route} from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import About from "./pages/About"
import Collection from "./pages/Collection"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/user/Dashboard"
import AdminDashboard from "./pages/Admin/adminDashboard"
import UserProfile from "./pages/user/UserProfile"
import UserOrders from "./pages/user/UserOrders"
import ManageUser from "./pages/Admin/ManageUser"
import CreateCollection from "./pages/Admin/CreateCollection"
import CreateProduct from "./pages/Admin/CreateProduct"
import ErrorPages from "./pages/ErrorPages"
import { AdminRoute } from "./components/routes/AdminRoute"
import PrivateRoute from "./components/routes/PrivateRoute"


function App() {
  

  return (
    <>
       <Routes>
      <Route path="/" element={<Layout title={"Ecommerce"} />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="collection" element={<Collection />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

      
        <Route path="dashboard" element={<PrivateRoute/>}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/orders" element={<UserOrders/>} />

        </Route>

        <Route path="/dashboard" element={<AdminRoute/>}>
          <Route path="admin" element={<AdminDashboard/>}/>
          <Route path="admin/createcollection" element={<CreateCollection/>}/>
          <Route path="admin/createproduct" element={<CreateProduct/>}/>
          <Route path="admin/manageusers" element={<ManageUser/>}/>
        </Route>

      
        <Route path="*" element={<ErrorPages />} />
      </Route>
    </Routes>
    </>
  )
}

export default App