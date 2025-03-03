import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider =(props)=>{
    const[auth,setAuth]=useState({
        user:null,
        token:""
    })

    //default axios
    axios.defaults.headers.common['Authorization']=auth?.token

    useEffect(()=>{
        const data =localStorage.getItem('auth')
        if(data){
            const parsedata=JSON.parse(data)
            setAuth({
                ...auth,
                user:parsedata.user,
                token:parsedata.token
            })
        }
    },[]);
    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}

const useAuth=()=>useContext(AuthContext);

export {useAuth,AuthProvider}
