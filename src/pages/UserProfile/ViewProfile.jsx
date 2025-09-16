import React from 'react'
import useAuth from '../../hooks/useAuth'
import Loading from '../../components/Loading/Loading'
import useUserRole from '../../hooks/useUserRole'
import { Link } from 'react-router'

const ViewProfile = () => {

    const { user } = useAuth();
    const { role } = useUserRole();



    if (!user) {
        return <Loading />
    }

    if (!role) {
        return <Loading />
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    src={user.photoURL} alt='Photo Not Found'
                    className="w-full max-w-sm rounded-lg shadow-2xl"
                />
                <div>
                    <h1 className="text-5xl font-bold">{user.displayName}</h1>
                    <p className="py-6">
                        {user.email}
                    </p>
                    <p>Role: {role}</p>
                    <Link to='/auth/updateProfile' className="btn btn-primary my-6">Update Profile</Link>
                </div>
            </div>
        </div>
    )
}

export default ViewProfile