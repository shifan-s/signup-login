import { createContext, useEffect, useState } from "react"; //step 1
import axios from "axios";
const AuthContext = createContext() //step 2


export const AuthContextProvider =({children})=>{  //step 4

    const[auth,setAuth]=useState({
        user:null,
        token:""
    })

    // default axios

axios.defaults.headers.common["Authorization"]= auth?.token;

    useEffect(() => {
    const data = localStorage.getItem("auth")
    if(data){
        const parseData = JSON.parse(data)
        setAuth({ ...auth, user : parseData.user, token : parseData.token })
    }
    //eslint-disable-next-line
    }, [] )
     
    const values ={auth,setAuth}
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>  //step 5

}


export default AuthContext //step 3