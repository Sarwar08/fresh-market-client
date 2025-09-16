import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAxios from '../../hooks/useAxios'
import ProductForShop from './ProductForShop';
import Loading from '../../components/Loading/Loading';

const Shop = () => {

    const axiosInstance = useAxios();

    const {data} = useQuery({
        queryKey: ['shop'], 
        queryFn: async () => {
            const res = await axiosInstance.get(`/products`);
            return res.data;
        }
    })

    const products = Array.isArray(data) ? data : [];

    const acceptedProducts = products?.filter(product => product.status === 'accepted');

    if (!data ) {
        return <Loading />
    }
    return (
        <div className='my-6 p-2'>
            {/* <h1>{products?.length}</h1> */}
            <div className='grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-6 overflow-x-auto'>
                {
                    acceptedProducts?.map(product => <ProductForShop key={product._id} product={product} /> )
                }
            </div>
        </div>
    )
}

export default Shop