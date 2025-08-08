import React from 'react'
import { AuthContext } from './AuthContext'
import { auth } from '../../firebase/firebase.init'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const AuthProvider = ({children}) => {

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const authInfo = {
        createUser,
        loginUser,
        
        
    }

  return (
    <AuthContext value={authInfo}>
        {children}
    </AuthContext>
  )
}

export default AuthProvider