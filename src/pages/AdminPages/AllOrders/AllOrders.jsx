import React, { useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import AllOrder from './AllOrder';

const AllOrders = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: myOrders, } = useQuery({
        queryKey: ['my-orders'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts`);
            return res.data;
        }
    })

    const paidOrders = myOrders?.filter(order => order.payment_status === 'paid');
    console.log(paidOrders);

    return (
        <div className="overflow-x-auto">
            {myOrders?.length}
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>name</th>
                        <th>Qty x Unit Price</th>
                        <th>Total Price</th>
                        <th>Payment <br /> Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        paidOrders?.map((product, index) => <AllOrder key={product._id} product={product} index={index} />)
                    }
                </tbody>
            </table>
        </div>
    )
}


export default AllOrders