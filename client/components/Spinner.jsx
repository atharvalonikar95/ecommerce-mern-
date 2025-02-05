import CircularProgress from '@mui/material/CircularProgress';

import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export const Spinner = ({path='login'}) => {
    const [count,setCount]=useState(5)
    const navigate=useNavigate()
    const location = useLocation()

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((prev)=>--prev)
        },1000);
        count===0 && navigate(`${path}`,{
          state:location.pathname
        })
        return()=>clearInterval(interval)
    },[count,navigate,location,path])
  return (
    <div  className='flex gap-2 justify-center items-center h-[100vh]'>
        <p className='text-lg font-medium'> redirecting to you in {count} seconds</p>
        <CircularProgress/>
    </div>
  )
}
