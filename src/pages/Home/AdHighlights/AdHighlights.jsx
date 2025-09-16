import React from 'react'
import useAxios from '../../../hooks/useAxios'
import { useQuery } from '@tanstack/react-query';
import SingleAd from './SingleAd';


const AdHighlights = () => {

    const axiosInstance = useAxios();

    const { data } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/products`);
            return res.data;
        }
    })

    const products = Array.isArray(data) ? data : [];

    return (
        <div>
            <h1 className='text-4xl font-semibold text-center mb-8'>Ad Highlights</h1>
            <div className='grid grid-cols-3 md:grid-cols-5 gap-6'>
                {
                    products?.map(product => <SingleAd key={product._id}
                        product={product} />)
                }
            </div>
        </div>
    )
}

export default AdHighlights