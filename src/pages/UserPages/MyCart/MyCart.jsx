import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import CartProduct from './CartProduct';
import useAuth from '../../../hooks/useAuth';

const MyCart = () => {

    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const { data: myCart, } = useQuery({
        queryKey: ['my-cart'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`);
            return res.data;
        }
    })

    return (
        <div className="overflow-x-auto">
            {myCart?.length}
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
                        myCart?.map((product, index) => <CartProduct key={product._id} product={product} index={index} /> )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MyCart