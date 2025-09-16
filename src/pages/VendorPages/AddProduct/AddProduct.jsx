import React, { useState } from 'react'
import img1 from '../../../assets/addProduct.jpg'
import useAuth from '../../../hooks/useAuth'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const AddProduct = () => {

    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const today = new Date();
    const [startDate, setStartDate] = useState(today);

    const [itemImg, setItemImg] = useState('');

    const onSubmit = (data) => {
        // console.log(data);

        const productInfo = {
            email: data.email,
            name: data.name,
            marketName: data.marketName,
            date: startDate.toISOString(),
            marketDescription: data.marketDescription,
            itemName: data.itemName,
            status: data.status,
            itemImage: itemImg,
            price: data.price,
            unit: data.unit,
            itemDescription: data.itemDescription,

        }

        // console.log(productInfo);

        axiosSecure.post('/products', productInfo)
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
                navigate('/dashboard/myProducts');
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    const uploadImage = async (e) => {
        const image = e.target.files[0];

        const formData = new FormData();
        formData.append('image', image);

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_IMAGE_UPLOAD_KEY}`;

        const res = await axios.post(imageUploadUrl, formData);

        setItemImg(res.data.data.url)
    }
    // console.log(itemImg);


    return (
        <div className="hero bg-base-200/40 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse md:items-start">

                <img src={img1} className='w-full md:max-w-lg' />

                <div className="flex-1 card bg-orange-900/30 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-4xl font-bold text-center mb-5">Add a Product - Vendors Only</h1>

                        <form onSubmit={handleSubmit(onSubmit)} className="fieldset space-y-2 ">

                            <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                                <label className="label">Vendor Email</label>
                                <input type="email"
                                    {...register('email', { required: true })}
                                    className="input" placeholder="Email" readOnly value={user.email} />
                                {
                                    errors.email?.type === 'required' && <p>Email is Required.</p>
                                }
                            </div>

                            <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                                <label className="label">Vendor Name</label>
                                <input type="text"
                                    {...register('name', { required: true })}
                                    className="input" placeholder="Name of Vendor" readOnly value={user.displayName} />
                            </div>

                            <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                                <label className="label">Market Name</label>
                                <input type="text"
                                    {...register('marketName', { required: true })}
                                    className="input" placeholder="Market Name" defaultValue='Karwan Bazar' />
                            </div>

                            <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                                <label className="label">Date</label>
                                <div>
                                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className='input' />
                                </div>
                            </div>

                            <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                                <label className="label">Market Description</label>
                                <textarea type="text"
                                    {...register('marketDescription', { required: true })}
                                    className="textarea" placeholder="Market Description" defaultValue='This market is located in the Dhaka Area. It was established in 1972. It is a very popular market in this country.' />
                            </div>

                            <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                                <label className="label">Item Name</label>
                                <input type="text"
                                    {...register('itemName', { required: true })}
                                    className="input" placeholder="Item Name" defaultValue='' />
                            </div>

                            <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                                <label className="label">Status</label>
                                <input type="text"
                                    {...register('status', { required: true })}
                                    className="input" placeholder="Status" readOnly value='pending' />
                            </div>

                            <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                                <label className="label">Product Image</label>
                                <input type="file" className="input" onChange={uploadImage} placeholder="Image URL" />
                            </div>

                            <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                                <label className="label">Price per Unit</label>
                                <div>
                                    <input type="number"
                                        {...register('price', { required: true })}
                                        className="input w-36" placeholder="Price per Unit" />
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
                                    className="input" placeholder="Item description" defaultValue="This item is very fresh." />
                            </div>

                            <div className=''>
                                <button className="btn btn-neutral mt-4 w-full">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct