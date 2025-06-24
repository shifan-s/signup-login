import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Loader from "../Loader";

export const AdminRoute = ()=> {
    const [ok, setOk] = useState(false)
    const {auth} = useContext(AuthContext)
useEffect(()=>{
    const authCheck = async () =>{
        const {data}= await axios.get("/api/v1/auth/admin-auth")
        if (data.ok){
            setOk(true)
        }else{
            setOk(false)
        }
        }
        if(auth?.token) authCheck()
},[auth?.token])
return ok? <Loader/> :  <Outlet path=""/>
}