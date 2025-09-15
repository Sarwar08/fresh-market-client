import React from 'react'

import MyOrder from './MyOrder';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading/Loading';

const MyOrders = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: myOrders, isLoading } = useQuery({
        queryKey: ['my-orders'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`);
            return res.data;
        }
    })

    const paidCarts = myOrders?.filter(order => order.payment_status === 'paid');

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="overflow-x-auto">
            {paidCarts?.length}
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
                        paidCarts?.map((product, index) => <MyOrder key={product._id} product={product} index={index} />)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MyOrders