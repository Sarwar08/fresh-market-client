import React from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import MyProduct from './MyProduct';

const MyProducts = () => {

    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {data: myProducts} = useQuery({
        queryKey: ['my-products', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products?email=${user.email}`)
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
                        <th></th>
                        <th>Item Name</th>
                        <th>Price <br /> per Unit</th>
                        <th>Market <br /> Name</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myProducts?.map((product, index) => <MyProduct key={product._id} product={product} index={index} />)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MyProducts