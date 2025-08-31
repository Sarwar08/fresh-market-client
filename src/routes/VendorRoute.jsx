import React from 'react'
import useUserRole from '../hooks/useUserRole'
import Loading from '../components/Loading/Loading';
import { Navigate } from 'react-router';

const VendorRoute = ({ children }) => {

    const { role, roleLoading } = useUserRole();

    if (roleLoading) {
        return <Loading />
    }

    if (role !== 'vendor') {
        return <Navigate to='/forbidden' />
    }

    return children;
}

export default VendorRoute