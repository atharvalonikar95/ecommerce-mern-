import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { toast } from 'react-toastify'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { createTheme, IconButton } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

export const Header = () => {
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()



  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleonlogout = () => {
    setAuth({
      ...auth, user: null, token: ""
    })
    localStorage.removeItem('auth')
    toast.success("Logout successfully")
    navigate('/login')
  }
  return (
    <div className='h-[10vh] flex flex-row justify-between items-center px-10 shadow-xl rounded-sm' style={{ color: "#78909C" }}>
      <div className='flex '>
        <p className='text-[25px] font-semibold hover:cursor-pointer '>🛒 ECOMMERCE APP </p>
      </div>
      <div className='flex flex-row gap-3 hover:cursor-pointer items-center' >
        <p className='text-[20px] font-semibold' onClick={() => { navigate('/') }}>HOME </p>
        <p className='text-[20px] font-semibold'>CATEGORY </p>

        {
          !auth.user ? (
            <>
            
              <p className='text-[20px] font-semibold' onClick={() => { navigate('/register') }}>REGISTER </p>
              <p className=' text-[20px] font-semibold' onClick={() => { navigate('/login') }}>LOGIN </p>
            </>
          ) : (
            <>
              <IconButton
                className='flex p-0 '
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <p className=' text-[20px] font-semibold' onClick={handleClose}>{auth.user.name}</p>

              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => navigate(`/dashboard/${auth?.user?.role===1 ?"admin":"user"}`)}>Dashboard</MenuItem>
                <MenuItem onClick={handleonlogout}>Logout</MenuItem>
              </Menu>
            </>
          )


        }

        <p className='text-[20px] font-semibold'>CART(0)</p>
      </div>

    </div>
  )
}
