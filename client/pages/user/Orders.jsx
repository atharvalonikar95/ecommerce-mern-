import React from 'react'
import Layout from '../../components/layout/Layout'
import { Usermenu } from './Usermenu'

export const UserOrders = () => {
    
    return (
        <Layout>
        <div className='flex flex-row w-full mt-4 gap-4 '>
            <div >
              <Usermenu/>       
            </div>
            <div>
             <p className='text-xl from-neutral-900 '>Orders</p>        
            </div>
        </div>
      </Layout>
    )
}
