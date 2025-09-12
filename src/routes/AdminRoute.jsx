import React from 'react'
import useUserRole from '../hooks/useUserRole'
import Forbidden from '../pages/Dashboard/Forbidden';
import Loading from '../components/Loading/Loading';

const AdminRoute = ({children}) => {

    const {role, roleLoading } = useUserRole();

    if (roleLoading) {
        return <Loading />
    }

    if (role !== 'admin'){
        return <Forbidden />
    }

  return children
}

export default AdminRoute