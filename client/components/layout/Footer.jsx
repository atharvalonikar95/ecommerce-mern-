import React from 'react'

export const Footer = () => {
  return (
    <div className='h-[12vh] flex flex-col justify-center items-center' style={{border:'1px solid black',backgroundColor:"#78909C",color:"white"}}>
      <div>
      <p className='text-[25px]'>All Rights Reserved ©️  </p>
      </div>
      <div className='flex flex-row gap-2 hover:cursor-pointer'>
        <p>About</p>
        <p> |</p>
        <p>Contact</p>
        <p> |</p>
        <p>Privacy Policy</p>
      </div>
    </div>

  )
}
