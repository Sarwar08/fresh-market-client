import React from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import WishListItem from './WishListItem';
import Loading from '../../../components/Loading/Loading';

const MyWishList = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: myCart, isLoading, refetch} = useQuery({
        queryKey: ['my-cart'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`);
            return res.data;
        }
    })

    const wishlistCart = myCart?.filter(cart => cart.payment_status === 'wishlist');

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="overflow-x-auto">
            <p className='text-3xl text-rose-400 font-semibold bg-amber-300/20 text-center py-4'>No of Items in the wishlist: {wishlistCart?.length} </p>
            <table className="table bg-amber-800/50">
                {/* head */}
                <thead className='bg-rose-600/70 text-xl'>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>name</th>
                        <th> Unit Price</th>
                        <th>Listed As </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        wishlistCart?.map((product, index) => <WishListItem key={product._id} product={product} index={index} refetch={refetch} />)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MyWishList