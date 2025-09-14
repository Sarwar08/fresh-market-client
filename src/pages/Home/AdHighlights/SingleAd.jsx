import React from 'react'
import useAxios from '../../../hooks/useAxios'
import { useQuery } from '@tanstack/react-query';

const SingleAd = ({ product }) => {

    const { itemName, itemImage, adOffer, adStatus } = product;

    const axiosInstance = useAxios();

    const { data: ads } = useQuery({
        queryKey: ['ads'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/advertisements`)
            return res.data;
        }
    })

    if (adOffer && adStatus === "accepted") {

        return (
            <div className="card bg-base-100 shadow-sm relative">
                <div>
                    {
                        ads?.map(ad => <p
                            key={ad._id}
                            className='absolute w-20'
                        >
                            
                            {
                                adOffer === '25%'
                                &&
                                ad.adTitle === '25% Discount'
                                &&
                                ad.image !== ''
                                &&
                                ad.status === 'accepted'
                                &&
                                <img src={ad.image} alt="" />
                            }
                            {
                                adOffer === '50%'
                                &&
                                ad.adTitle === '50% Discount'
                                &&
                                ad.status === 'accepted'
                                &&
                                ad.image !== ''
                                &&
                                <img src={ad.image} alt="" />
                            }
                        </p>)
                    }
                </div>
                <figure>
                    <img src={itemImage} alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{itemName}</h2>
                    <p>{adOffer} Discount</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleAd