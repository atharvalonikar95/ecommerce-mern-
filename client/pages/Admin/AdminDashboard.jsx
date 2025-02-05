import React from 'react'
import Layout from '../../components/layout/Layout'
import { Adminmenu } from '../../components/layout/Adminmenu'
import { Usercard } from '../../components/layout/User-card'

export const AdminDashboard = () => {
  return (
    <Layout>
      <div className='flex flex-row w-full mt-4 gap-4 '>
          <div >
            <Adminmenu/>       
          </div>
          <div>
            <Usercard/>       
          </div>
      </div>
    </Layout>
  )
}
