import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import CartProduct from './CartProduct';
import useAuth from '../../../hooks/useAuth';

const MyCart = () => {

    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const { data: myCart, refetch } = useQuery({
        queryKey: ['my-cart'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`);
            return res.data;
        }
    })

    const unpaidCart = myCart?.filter(cart => cart.payment_status === 'pending');

    return (
        <div className="overflow-x-auto">
            {unpaidCart?.length}
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
                        unpaidCart?.map((product, index) => <CartProduct key={product._id} product={product} index={index} refetch={refetch} /> )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MyCart