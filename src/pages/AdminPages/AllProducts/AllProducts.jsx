import { useQuery } from '@tanstack/react-query';
import React from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import MyProduct from '../../VendorPages/MyProducts/MyProduct';

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();

    const {data: products} = useQuery({
        queryKey: ['my-products'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products`)
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
                        products?.map((product, index) => <MyProduct key={product._id} product={product} index={index} />)
                    }
                </tbody>
            </table>
        </div>
    )
}


export default AllProducts