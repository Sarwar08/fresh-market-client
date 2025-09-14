import React from 'react'
import useAuth from '../../hooks/useAuth'

const VendorDashBoard = () => {

    const {user} = useAuth();

  return (
    <div className='bg-rose-500 max-w-lg rounded-2xl mx-auto m-24'>
        <h1 className='text-4xl font-bold text-center p-12'>Welcome <br /> <br /> <span className='bg-rose-700 p-4 rounded-2xl text-amber-200'>{user.displayName}</span> <br /> <br /> in your Dashboard</h1>
    </div>
  )
}

export default VendorDashBoard