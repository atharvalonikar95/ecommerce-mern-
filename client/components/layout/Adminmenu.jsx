import { Table, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const Adminmenu = () => {
    const location =useLocation()
    const navigate=useNavigate()

    return (
        // 'hover:bg-sky-600  ' 'hover:text-white'
        <div className=' ml-5 text-center mt-2' >
            <div className=''>
                <p className='text-xl '>Admin Panel</p>
            </div>
            <Table   style={{border: '1px solid gainsboro'}} aria-label="simple table">
                <TableHead className="" >
                    <TableRow className={location.pathname==='/dashboard/admin/create-category'?'bg-sky-600 ':'hover:bg-sky-600 '}>
                        <TableCell onClick={()=>{navigate('/dashboard/admin/create-category')}}> <p className={location.pathname==='/dashboard/admin/create-category'?'text-white hover:text-black':' hover:text-white'} > Create Category</p></TableCell>
                    </TableRow>
                    <TableRow className={location.pathname==='/dashboard/admin/create-products'?'bg-sky-600':'hover:bg-sky-600'}>
                        <TableCell onClick={()=>{navigate('/dashboard/admin/create-products')}}> <p className={location.pathname==='/dashboard/admin/create-products'?'text-white hover:text-black':'text-black hover:text-white'} > Create Product</p></TableCell>
                    </TableRow>
                    <TableRow className='hover:bg-sky-600  '>
                        <TableCell className='hover:text-white' onClick={()=>{navigate('/dashboard/admin/users')}}>Users</TableCell>
                    </TableRow>
                </TableHead>
            </Table>

        </div>
    )
}
