import React from 'react'
import useAuth from '../../../hooks/useAuth'

const LogOut = () => {

    const {logOut} = useAuth();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log('Signed Out Successfully');
            })
            .catch(error => {
                console.log(error.message);
            })
    }

  return (
    <button className='btn btn-sm btn-warning' onClick={handleLogOut}>LogOut</button>
  )
}

export default LogOut