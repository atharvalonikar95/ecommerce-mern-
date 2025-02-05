import React from 'react'
import Layout from '../components/layout/Layout'

export const PagenotFound = () => {
  return (
    < >
        <div className='h-[400px] flex flex-col items-center justify-center mt-20  ' style={{}}>
            <div className='flex flex-col justify-center items-center'>
                <p className='text-[100px] font-medium '>404</p>
                <p className='text-[30px]'> Oops..!!</p>
                <p className='text-[20px]'> Page not Found</p>
            </div>
            <div className='flex flex-row mt-10 gap-2 items-center  '>
                <p className='text-[20px]'>Lets Go </p>
                <button className='text-[20px] text-white bg-blue-500 px-3 py-1 rounded-lg'>Home</button>
            </div>
        </div>
    </>
  )
}
