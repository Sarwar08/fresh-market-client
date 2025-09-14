import React from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import AllAd from './AllAd';

const AllAds = () => {
    const axiosSecure = useAxiosSecure();

    const { data: ads, refetch } = useQuery({
        queryKey: ['all-ads'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/advertisements`)
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
                        ads?.map((ad, index) => <AllAd key={ad._id} ad={ad} index={index} refetch= {refetch} />)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AllAds