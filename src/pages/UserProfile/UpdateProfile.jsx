import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import useUserRole from '../../hooks/useUserRole';
import Loading from '../../components/Loading/Loading';


const UpdateProfile = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { role } = useUserRole();

    const [profilePhotoURL, setProfilePhotoURL] = useState(user?.photoURL);

    const navigate = useNavigate();

    const { setLoading, updateUser } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // console.log(data);

        // update user
        const profileInfo = {
            displayName: data.name,
            photoURL: profilePhotoURL,
        }

        Swal.fire({
            title: "Do you want to update it?",
            text: "",
            background: "#233659",
            color: "#fff",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!"
        }).then((result) => {
            if (result.isConfirmed) {
                updateUser(profileInfo)
                    .then((res) => {
                        console.log("Profile updated successfully.");
                        Swal.fire({
                            title: "User Profile Updated on Firebase!",
                            background: "#275214",
                            color: "#fff",
                            text: "Your profile has been Updated.",
                            icon: "success"
                        });

                        // send userInfo to DB
                        const userInfo = {
                            role: data.role.toLowerCase(),
                        }

                        axiosSecure.patch(`/users/${user?.email}/role`, userInfo)
                            .then(res => {
                                // console.log(res.data);
                                console.log('Data added successfully.');
                                Swal.fire({
                                    title: "User DB Updated!",
                                    background: "#2c5e17",
                                    color: "#fff",
                                    text: "Your role has been Updated.",
                                    icon: "success"
                                });
                                navigate('/auth/viewProfile');
                                setLoading(false);
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
            }
        });
    }

    const handlePhotoUpload = async (e) => {
        const image = e.target.files[0];
        // console.log(image);

        const formData = new FormData();
        formData.append('image', image);

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_IMAGE_UPLOAD_KEY}`;

        const res = await axios.post(imageUploadUrl, formData);

        setProfilePhotoURL(res.data.data.url);

    }

    if (!user) {
        return <Loading />
    }

    if (!role) {
        return <Loading />
    }

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

            <div className="card-body">

                <h1 className="text-5xl font-bold">Update Profile</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="fieldset space-y-2">
                    {/* name */}
                    <div className='space-y-1'>
                        <label className="label">Your Name</label>
                        <input type="text"
                            {...register('name', { required: true })}
                            className="input" placeholder="Your Name" defaultValue={user?.displayName} />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500'>Name is required.</p>
                        }
                    </div>
                    {/* email */}
                    <div className='space-y-1'>
                        <label className="label">Email</label>
                        <input disabled type="email"
                            className="input" placeholder="Email" readOnly value={user?.email} />
                    </div>

                    {/* password */}
                    <div>
                        <label className="label">Password</label>
                        <input disabled type="password"
                            className="input" placeholder="Password" readOnly value='123456' />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password is required.</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters.</p>
                        }
                    </div>
                    {/* photo */}
                    <div className='space-y-1'>
                        <label className="label">Your Photo</label>
                        <input type="file"
                            {...register('photo')}
                            onChange={handlePhotoUpload}
                            className="input" placeholder="Upload your profile picture" />
                    </div>
                    {/* choose your role */}
                    <div className='space-y-1'>
                        <label className="label">Choose Your Role</label>
                        <div className='space-x-4'>
                            <label className='label hover:text-cyan-500 hover:font-bold'>
                                <input
                                    type="radio"
                                    value='User'
                                    className="radio radio-primary"
                                    {...register('role')}
                                    defaultChecked={role === 'user'}
                                />
                                User
                            </label>

                            <label className='label hover:text-cyan-500 hover:font-bold'>
                                <input
                                    type="radio"
                                    value='Vendor'
                                    className="radio radio-primary"
                                    {...register('role')}
                                    defaultChecked={role === 'vendor'}

                                />
                                Vendor
                            </label>
                        </div>
                    </div>

                    <button className="btn btn-neutral mt-4">Update User</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile