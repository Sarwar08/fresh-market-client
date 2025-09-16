import { useQuery } from '@tanstack/react-query';
import React from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import MyProduct from '../../VendorPages/MyProducts/MyProduct';
import Loading from '../../../components/Loading/Loading';
import Product from './Product';

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();

    const {data: products, isLoading, refetch} = useQuery({
        queryKey: ['my-products'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products`)
            return res.data;
        }
    })

    if (isLoading) {
        <Loading />
    }

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
                        products?.map((product, index) => <MyProduct key={product._id} product={product} index={index} refetch={refetch} />)
                    }
                </tbody>
            </table>
        </div>
    )
}


export default AllProducts