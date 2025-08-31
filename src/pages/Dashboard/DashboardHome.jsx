import React from 'react'
import useUserRole from '../../hooks/useUserRole'
import Loading from '../../components/Loading/Loading';
import UserDashboard from './UserDashboard';
import AdminDashBoard from './AdminDashBoard';
import VendorDashBoard from './VendorDashBoard';
import Forbidden from './Forbidden';

const DashboardHome = () => {
    const {role, roleLoading} = useUserRole();

    if (roleLoading) {
        return <Loading />
    }

    console.log(role);

    if (role === 'user') {
        return <UserDashboard />
    }
    else if (role === 'vendor') {
        return <VendorDashBoard />
    }
    else if (role === 'admin') {
        return <AdminDashBoard />
    }
    else {
        return <Forbidden />
    }
}

export default DashboardHome