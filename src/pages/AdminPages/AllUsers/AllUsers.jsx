import React from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import User from './User';


const AllUsers = () => {

    const axiosSecure = useAxiosSecure();

    const { data: users } = useQuery({
        queryKey: ['all-Users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    })

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user, index) => <User key={user._id} user={user} index={index} />)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AllUsers