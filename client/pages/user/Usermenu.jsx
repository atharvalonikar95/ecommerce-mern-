import { Table, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const Usermenu = () => {
    const navigate=useNavigate()
    const location =useLocation()

    const isProfile=location.pathname==='/dashboard/user/profile'
    const isOrders=location.pathname==='/dashboard/user/orders'

    return (
        
        <div className=' ml-5 text-center mt-2 flex flex-col gap-2' >
            <div className=''>
                <p className='text-xl '>User Panel</p>
            </div>
            <Table   style={{border: '1px solid gainsboro'}} aria-label="simple table">
                <TableHead className="" >
                    <TableRow className={`hover:bg-gray-400   ${isProfile ? 'bg-sky-600 ' : ''}`}  >
                        <TableCell className={`hover:text-white `} style={{color:isProfile?'white':'black'}} onClick={()=>{navigate('/dashboard/user/profile')}}>Profile</TableCell>
                    </TableRow>
                    <TableRow className={`hover:bg-gray-400  ${isOrders ? 'bg-sky-600 ' : ''}`}>
                        <TableCell className='hover:text-white' style={{color:isOrders?'white':'black'}} onClick={()=>{navigate('/dashboard/user/orders')}}>Orders</TableCell>
                    </TableRow>
                </TableHead>
            </Table>

        </div>
    )
}
