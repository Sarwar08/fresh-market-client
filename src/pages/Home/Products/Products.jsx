import React from 'react'
import useAxios from '../../../hooks/useAxios'
import { useQuery } from '@tanstack/react-query';
import Product from './Product';
import Loading from '../../../components/Loading/Loading';

const Products = () => {

    const axiosInstance = useAxios();

    const {data, isLoading} = useQuery({
        queryKey: ['all-products'],
        queryFn: async () => {
            const res = await axiosInstance.get('/products');
            return res.data;
        }
    })

    const acceptedData = data?.filter(dat => dat.status === 'accepted');

    const firstSixData = acceptedData?.slice(0, 6);
    console.log(data);
    console.log(firstSixData);

    if (isLoading) {
        return <Loading />
    }



  return (
    <div>
        <h1 className='text-4xl font-semibold text-center mb-8'>Products</h1>
        <div className='grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6'>
            {
                firstSixData?.map(product => <Product key={product._id} product={product} />)
            }
        </div>
    </div>
  )
}

export default Products