import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'



const register_init={
  name:"",
  email:"",
  password:"",
  address:"",
  phone:"",
  answer:""
}

export const Register = () => {
  const navigate= useNavigate()

  const [regdata,setRegdata]=useState(register_init)

  const handleonchange=(e)=>{
    setRegdata((currdata)=>({...currdata,[e.target.name]:e.target.value}))
  }

  const handleonsubmit= async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:8080/api/v1/auth/register',
        regdata
      )
      if(res.data && res.data.success){
        toast.success(res.data.message);
        navigate('/login')
      }else{
        console.log(res.data.err);
      }

    }catch(err){
      console.log(err);
    }

    console.log(regdata);
    setRegdata(register_init)
  }

  return (
    <Layout>
      <div className='flex items-center justify-center  h-[78vh] bg-[#eaeced] '>
       <div className='h-[502px] w-[400px] flex flex-col items-center  rounded-md shadow-2xl bg-white' style={{}}>
        <p className='text-[40px] mt-5 text-[#78909C]'>Register here 👇</p>
        <form onSubmit={handleonsubmit} className='mt-5 w-full flex flex-col items-center gap-4' >
          <input  type="text" name='name'value={regdata.name} onChange={handleonchange} placeholder='Enter Name' className='h-10 w-[70%] p-4 rounded-md outline-gray-400  'style={{border:"1px solid gray"}} />
          <input  type="text" name='email' value={regdata.email} onChange={handleonchange} placeholder='Enter Email' className='h-10 w-[70%] p-4 rounded-md outline-gray-400  'style={{border:"1px solid gray"}} />
          <input  type="password" name='password' value={regdata.password} onChange={handleonchange} placeholder='Enter Password' className='h-10 w-[70%] p-4 rounded-md outline-gray-400  'style={{border:"1px solid gray"}} />
          <input  type="text" name='phone' value={regdata.phone} onChange={handleonchange} placeholder='Enter Phone' className='h-10 w-[70%] p-4 rounded-md outline-gray-400  'style={{border:"1px solid gray"}} />
          <input  type="text" name='address' value={regdata.address} onChange={handleonchange} placeholder='Enter Address' className='h-10 w-[70%] p-4 rounded-md outline-gray-400  'style={{border:"1px solid gray"}} />
          <input  type="text" name='answer' value={regdata.answer} onChange={handleonchange} placeholder='Enter answer' className='h-10 w-[70%] p-4 rounded-md outline-gray-400  'style={{border:"1px solid gray"}} />
          <button className='text-[20px] mt-2 text-white bg-[#78909C] px-10 py-2 rounded-lg'>submit</button>
        </form>
       </div>
      </div>
    </Layout>
  )
}
