import { Table, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'

export const Usercard = () => {
    const navigate=useNavigate()
    const[auth]=useAuth()

    return (
        
        <div className=' ml-5 text-center mt-2' >
            <div>
                <p className='text-xl '>{auth.user.role===1 ?"Admin":"User"} details</p>
            </div>
            <Table   style={{border: '1px solid gainsboro'}} aria-label="simple table">
                <TableHead className="" >
                    <TableRow className='hover:bg-sky-600  '  >
                        <TableCell className='hover:text-white' >Name: {auth.user.name}</TableCell>
                    </TableRow>
                    <TableRow className='hover:bg-sky-600  '>
                        <TableCell className='hover:text-white' >phone: {auth.user.phone}</TableCell>
                    </TableRow>
                    <TableRow className='hover:bg-sky-600  '>
                        <TableCell className='hover:text-white' >email: {auth.user.email}</TableCell>
                    </TableRow>
                    <TableRow className='hover:bg-sky-600  '>
                        <TableCell className='hover:text-white' >address: {auth.user.address}</TableCell>
                    </TableRow>

                </TableHead>
            </Table>

        </div>
    )
}
