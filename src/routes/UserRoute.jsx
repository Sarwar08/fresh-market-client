import React from 'react'
import useUserRole from '../hooks/useUserRole'
import Loading from '../components/Loading/Loading';
import { Navigate } from 'react-router';

const UserRoute = ({children}) => {

    const {role, roleLoading} = useUserRole();

    if (roleLoading) {
        return <Loading />;
    }

    if (!role) {
        return <Navigate to='/forbidden' />;
    }

  return children;
}

export default UserRoute