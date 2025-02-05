import React from 'react'
import Layout from '../../components/layout/Layout'
import { Usermenu } from './Usermenu'

export const UserProfile = () => {
    return (
        <Layout>
        <div className='flex flex-row w-full mt-4 gap-4 '>
            <div >
              <Usermenu/>       
            </div>
            <div>
             <p className='text-xl from-neutral-900 '>Profile</p>        
            </div>
        </div>
      </Layout>
    )
}
