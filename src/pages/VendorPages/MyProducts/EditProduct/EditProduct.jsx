import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import { useNavigate, useParams } from 'react-router';
import Loading from '../../../../components/Loading/Loading';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import DatePicker from 'react-datepicker';

import useUserRole from '../../../../hooks/useUserRole';

const EditProduct = () => {

    const axiosSecure = useAxiosSecure();


    const {role} = useUserRole()

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();


    const { id } = useParams();
    // console.log(id);

    const { data: product, isLoading } = useQuery({
        queryKey: ['single-product', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${id}`);
            return res.data;
        }
    })

    if (isLoading) {
        return <Loading />
    }

    // console.log(product);

    const { _id: productId, email, name, marketName, date, marketDescription, itemName, status, itemImage, price,  itemDescription, } = product;

    const onSubmit = (data) => {
        // console.log(data);

        const productInfo = {
            marketName: data.marketName,
            marketDescription: data.marketDescription,
            itemName: data.itemName,
            price: data.price,
            unit: data.unit,
            status: data.status,
            itemDescription: data.itemDescription,
        }

        // console.log(productInfo);

        axiosSecure.patch(`/products/${productId}`, productInfo)
            .then(res => {
                // console.log(res.data);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    background: "#2c5e17",
                    color: "#fff",
                    title: "Items Added Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(`/dashboard/${role === 'admin' ? 'allProducts' :  'myProducts'}`);
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    return (
        <div className="hero bg-base-200/40 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse md:items-start">

                <img src={itemImage} className='w-full md:max-w-lg' />

                <div className="flex-1 card bg-orange-900/30 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-4xl font-bold text-center mb-5">Add a Product - Vendors Only</h1>

                        <form onSubmit={handleSubmit(onSubmit)} className="fieldset space-y-2 ">

                            <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                                <label className="label">Vendor Email</label>
                                <input type="email"
                                    {...register('email', { required: true })}
                                    className="input" placeholder="Email" readOnly value={email} />
                                {
                                    errors.email?.type === 'required' && <p>Email is Required.</p>
                                }
                            </div>

                            <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                                <label className="label">Vendor Name</label>
                                <input type="text"
                                    {...register('name', { required: true })}
                                    className="input" placeholder="Name of Vendor" readOnly value={name} />
                            </div>

                            <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                                <label className="label">Market Name</label>
                                <input type="text"
                                    {...register('marketName', { required: true })}
                                    className="input" placeholder="Market Name" defaultValue={marketName} />
                            </div>

                            <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                                <label className="label">Date</label>
                                <div>
                                    <DatePicker disabled selected={date} className='input' />
                                </div>
                            </div>

                            <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                                <label className="label">Market Description</label>
                                <textarea type="text"
                                    {...register('marketDescription', { required: true })}
                                    className="textarea" placeholder="Market Description" defaultValue={marketDescription} />
                            </div>

                            <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                                <label className="label">Item Name</label>
                                <input type="text"
                                    {...register('itemName', { required: true })}
                                    className="input" placeholder="Item Name" defaultValue={itemName} />
                            </div>

                            <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                                <label className="label">Status</label>

                                <select {...register('status', { required: true })} defaultValue={status} className="select">
                                    <option disabled={true}>{status}</option>
                                    <option disabled={role === 'vendor'? true : false} >accepted</option>
                                </select>

                            </div>



                            <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                                <label className="label">Product Image</label>
                                <input disabled type="file" className="input"
                                    placeholder="Image URL" />
                            </div>

                            <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                                <label className="label">Price per Unit</label>
                                <div>
                                    <input type="number"
                                        {...register('price', { required: true })}
                                        className="input w-36" placeholder="Price per Unit" defaultValue={price} />
                                    <select defaultValue=""
                                        {...register('unit', { required: true })}
                                        className="select w-24">
                                        <option disabled={true}>Pick a Unit</option>
                                        <option>Kg</option>
                                    </select>
                                </div>
                            </div>

                            <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                                <label className="label">Item Description</label>
                                <input type="text"
                                    {...register('itemDescription', { required: true })}
                                    className="input" placeholder="Item description" defaultValue={itemDescription} />
                            </div>

                            <div className=''>
                                <button className="btn btn-neutral mt-4 w-full">Update Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default EditProduct