import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAxios from '../../hooks/useAxios'
import ProductForShop from './ProductForShop';

const Shop = () => {

    const axiosInstance = useAxios();

    const {data: products} = useQuery({
        queryKey: ['shop'], 
        queryFn: async () => {
            const res = await axiosInstance.get(`/products`);
            return res.data;
        }
    })

    return (
        <div>
            <h1>{products?.length}</h1>
            <div className='grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 overflow-x-auto'>
                {
                    products?.map(product => <ProductForShop key={product._id} product={product} /> )
                }
            </div>
        </div>
    )
}

export default Shop