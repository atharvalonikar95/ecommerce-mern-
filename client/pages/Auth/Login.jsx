import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'

const logdata_init={
    email:"",
    password:''
}

export const Login = () => {
    const [auth,setAuth]=useAuth()
    const navigate = useNavigate()
    const[logdata,setLogdata]=useState(logdata_init)
    const location =useLocation()
    const handleonchange=(e)=>{
        setLogdata((curr)=>({...curr,[e.target.name]:e.target.value}))
    }

    const handleonsubmit= async(e)=>{
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:8080/api/v1/auth/login',logdata)

            console.log(res.data);
            if(res && res.data.success){
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token
                })
                localStorage.setItem('auth',JSON.stringify(res.data))
                
                navigate(location.state ||'/')
            }

        }catch(err){
            console.log(err);

        }
        // console.log(logdata);
        
        setLogdata(logdata_init)
    }

    return (
        <Layout >
            <div className='flex items-center justify-center bg-[#eaeced] h-[78vh] '>
                <div className='h-[350px] w-[400px] flex flex-col items-center justify-center  rounded-md shadow-2xl bg-white' style={{}}>
                    <p className='text-[40px]  text-[#78909C]'>Login here 👇</p>
                    <form onSubmit={handleonsubmit} className='mt-5 w-full flex flex-col items-center  gap-4' >
                        <input type="text" name='email' value={logdata.email} onChange={handleonchange} placeholder='Enter Email' className='h-10 w-[70%] p-4 rounded-md outline-gray-400  ' style={{ border: "1px solid gray" }} />
                        <input type="password" name='password' value={logdata.password} onChange={handleonchange} placeholder='Enter Password' className='h-10 w-[70%] p-4 rounded-md outline-gray-400  ' style={{ border: "1px solid gray" }} />
                        <button className='text-[20px] mt-2 text-white bg-[#78909C] px-10 py-2 rounded-lg'>login</button>
                    </form>
                    <div className='flex flex-col items-end mt-[0.8rem] mr-[2.5rem]  w-full    ' >
                        <button onClick={()=>{navigate('/forgotpassword')}} className='text-blue-700 ' >forgot password ?</button>
                    </div>

                </div>
            </div>

        </Layout>
    )
}

