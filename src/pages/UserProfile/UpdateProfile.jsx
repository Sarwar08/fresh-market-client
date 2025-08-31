import React from 'react'
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth'
import useAxiosSecure from '../../hooks/useAxiosSecure';

const UpdateProfile = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: aUser, isLoading, error } = useQuery({
        queryKey: ['a-user'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`);
            console.log(res);
            console.log(res.data);
            return res.data;
        },
        enabled: !!user?.email,
    })

    if (isLoading) {
        return <p>Loading user profile...</p>;
    }

    if (error) {
        return <p className="text-red-500">Error loading profile: {error.message}</p>;
    }

    // console.log(data?.data);

    return (
        <div>
            {/* <p>{aUser?.length}</p> */}
            <p>{
                aUser?.map(user =>
                    <div id={user._id} >
                        <p>{user.email}</p>
                        <p>{user.role}</p>
                    </div>)

            }
            </p>
        </div>
    )
}

export default UpdateProfile