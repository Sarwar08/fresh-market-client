import React, { useState } from 'react'
import useAxios from '../../hooks/useAxios'
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router';
import Loading from '../../components/Loading/Loading';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2'
import useAuth from '../../hooks/useAuth';

const ProductDetails = () => {

    const [qty, setQty] = useState(0);

    const axiosSecure = useAxiosSecure();

    const {user} = useAuth();

    const { id } = useParams();
    console.log(id);

    const navigate = useNavigate();

    const axiosInstance = useAxios();

    const { data: product, isLoading } = useQuery({
        queryKey: ['product-details'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/products/${id}`);
            return res.data;
        }
    })

    if (isLoading) return <Loading />

    const { _id: productId, itemName, itemImage, marketDescription, price, unit, itemDescription, adOffer } = product;


    const handleKg = (e) => {
        const kg = e.target.value;
        const conKg = parseInt(kg);
        setQty(conKg);
        console.log(qty);
    }

    const handleCart = (product_Id) => {

        const totalPrice = price * qty;

        const ordersInfo = {
            product_Id,
            email: user.email,
            itemName,
            itemImage,
            qty,
            price,
            unit,
            totalPrice,
            payment_status: 'pending', // default pending, if pending cart, paid order.
        }

        console.log(ordersInfo);

        axiosSecure.post('/carts', ordersInfo)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/dashboard/myCart');
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={itemImage}
                    className="max-w-sm rounded-lg shadow-2xl"
                />
                <div>
                    {adOffer && <span className='bg-green-500 rounded px-2 font-bold'>{adOffer} Discount</span>}
                    <h1 className="text-5xl font-bold">{itemName}</h1>
                    <p className="py-6">
                        {itemDescription}
                    </p>
                    <p className="">
                        {marketDescription}
                    </p>
                    <p>Price: {price} BDT / {unit}</p>

                    <label className='label'>How many Kg?</label>
                    <input onChange={handleKg} type="number" className='input w-12' />

                    <div>
                        <button onClick={() => handleCart(productId)} className="btn btn-warning mt-5 mr-2"> Add to Cart</button>
                        <button className="btn btn-error mt-5"> Add to Wishlist</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails