import React from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import User from './User';
import Loading from '../../../components/Loading/Loading';


const AllUsers = () => {

    const axiosSecure = useAxiosSecure();

    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ['all-Users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    })

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="overflow-x-auto">
            <table className="table bg-amber-800/50">
                {/* head */}
                <thead className='bg-rose-600/70'>
                    <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user, index) => <User key={user._id} user={user} index={index} refetch={refetch} />)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AllUsers