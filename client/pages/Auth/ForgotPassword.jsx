import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const logdata_init={
    email:"",
    newpassword:'',
    answer:""
}

export const ForgotPassword = () => {
    const navigate = useNavigate()
    const[logdata,setLogdata]=useState(logdata_init)
    const handleonchange=(e)=>{
        setLogdata((curr)=>({...curr,[e.target.name]:e.target.value}))
    }

    const handleonsubmit= async(e)=>{
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:8080/api/v1/auth/forgotpassword',logdata)

            if(res && res.data.success){
                toast.success(res.data.message)
                console.log(res.data);
                navigate('/login')
            }

        }catch(err){
            console.log(err);

        }
        // console.log(logdata);
        
        setLogdata(logdata_init)
    }

  return (
    <Layout>
        <div className='flex items-center justify-center bg-[#eaeced] h-[78vh] '>
            <div className='h-[350px] w-[400px] flex flex-col items-center justify-center  rounded-md shadow-2xl bg-white' style={{}}>
                <p className='text-[40px] text-center ml-2 text-[#78909C]'>Reset password 👇</p>
                <form onSubmit={handleonsubmit} className='mt-5 w-full flex flex-col items-center  gap-4' >
                    <input type="text" name='email' value={logdata.email} onChange={handleonchange} placeholder='Enter Email' className='h-10 w-[70%] p-4 rounded-md outline-gray-400  ' style={{ border: "1px solid gray" }} />
                    <input type="text" name='answer' value={logdata.answer} onChange={handleonchange} placeholder='Enter secret answer' className='h-10 w-[70%] p-4 rounded-md outline-gray-400  ' style={{ border: "1px solid gray" }} />
                    <input type="newpassword" name='newpassword' value={logdata.newpassword} onChange={handleonchange} placeholder='Enter new Password' className='h-10 w-[70%] p-4 rounded-md outline-gray-400  ' style={{ border: "1px solid gray" }} />
                    <button className='text-[20px] mt-2 text-white bg-[#78909C] px-10 py-2 rounded-lg'>Reset</button>
                </form>
            </div>
        </div>
        
    </Layout>
  )
}
