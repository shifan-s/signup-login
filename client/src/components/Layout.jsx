import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Toaster, toast } from 'sonner';
import { Helmet } from "react-helmet";
const Layout = () =>{
    return(
        <div>
<Helmet> 
<meta charSet="UTF-8" />
  <meta name="description" content="Free Web tutorials" />
  <meta name="keywords" content="HTML, CSS, JavaScript" />
  <meta name="author" content="John Doe" />
</Helmet>



<Navbar/>
<div className="min-h-[65vh]">
    <Outlet/>
</div>
<Footer/>
<Toaster position="top-right" richColors/>
        </div>
    )
}
export default Layout