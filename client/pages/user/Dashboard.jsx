import React from 'react'
import Layout from '../../components/layout/Layout'
import { Usermenu } from './Usermenu'
import { Usercard } from '../../components/layout/User-card'

export const Dashboard = () => {
  return (
    <Layout>
      <div className='flex flex-row w-full mt-4 gap-4 '>
          <div >
            <Usermenu/>       
          </div>
          <div>
            <Usercard/>       
          </div>
      </div>
    </Layout>
  )
}
