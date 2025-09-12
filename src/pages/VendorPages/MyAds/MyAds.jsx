import React from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import MyAd from './MyAd';

const MyAds = () => {

    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {data: myAds} = useQuery({
        queryKey: ['my-ads', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/advertisements?email=${user.email}`)
            return res.data;
        }
    })

  return (
    <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className=''>
                        <tr className=''>
                            <th>#</th>
                            <th></th>
                            <th>Ad Title</th>
                            <th>Ad  <br /> Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myAds?.map((ad, index) => <MyAd key={ad._id} ad={ad} index={index} />)
                        }
                    </tbody>
                </table>
            </div>
  )
}

export default MyAds