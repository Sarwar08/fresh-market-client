import React, { useState } from 'react'
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import Loading from '../../../components/Loading/Loading';

const EditAd = () => {
    const { user } = useAuth();

    const {id} = useParams();
    // console.log(id);

    const navigate = useNavigate();

    const {data: singleAd, isLoading} = useQuery({
        queryKey: ['singleAd', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/advertisements/${id}`);
            return res.data;
        }
    })

    const [discountImg, setDiscountImg] = useState(singleAd?.image);

    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {

        const adInfo = {
            adTitle: data.adTitle,
            adDescription: data.adDescription,
            image: discountImg,
        }

        // console.log(adInfo);

        axiosSecure.patch(`/advertisements/${id}`, adInfo)
            .then(res => {
                // console.log(res.data);
                navigate('/dashboard/myAds');
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

        setDiscountImg(res.data.data.url);
    }

    // console.log(discountImg);

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="hero bg-base-200/40 min-h-screen">
            
            <div className="hero-content flex-col lg:flex-row-reverse md:items-start">

                <div className="flex-1 card bg-orange-900/30 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-4xl font-bold text-center mb-5">Update Advertisement - Vendors Only</h1>

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
                                <label className="label">Ad Title</label>
                                <input type="text"
                                    {...register('adTitle', { required: true })}
                                    className="input" placeholder="Ad Title" defaultValue={singleAd.adTitle} />
                            </div>

                            <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                                <label className="label">Ad Description</label>
                                <textarea type="text"
                                    {...register('adDescription', { required: true })}
                                    className="textarea" placeholder="Ad Description" defaultValue={singleAd.adDescription} />
                            </div>

                            <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                                <label className="label">Product Image</label>
                                <input type="file" className="input" onChange={uploadImage} placeholder="Image URL" />
                            </div>

                            <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                                <label className="label">Status</label>
                                <input type="text"
                                    {...register('status', { required: true })}
                                    className="input" placeholder="Status" readOnly value={singleAd.status} />
                            </div>

                            <div className=''>
                                <button className="btn btn-neutral mt-4 w-full">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditAd