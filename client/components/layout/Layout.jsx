import React, { useState } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
import { toast } from 'react-toastify'


const Layout = (props) => {
  return (
    <div>
      <Header  />
        <main className='min-h-[78vh] '>
          {props.children}
        </main>
      <Footer/>
    </div>
  )
}

export default Layout;