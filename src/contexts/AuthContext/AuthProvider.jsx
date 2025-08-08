import React from 'react'
import { AuthContext } from './AuthContext'
import { auth } from '../../firebase/firebase.init'

const AuthProvider = ({children}) => {

    

    const authInfo = {
        
    }

  return (
    <AuthContext value={authInfo}>
        {children}
    </AuthContext>
  )
}

export default AuthProvider