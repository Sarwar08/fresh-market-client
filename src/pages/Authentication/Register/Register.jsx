import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import useAuth from '../../../hooks/useAuth';


const Register = () => {

    const { createUser } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);

        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user);

                // update user
            })
            .catch(error => {
                console.log(error.message);
            })

    }

    const handlePhotoUpload = async (e) => {
        const image = e.target.files[0];
        console.log(image);

        const formData = new FormData();
        formData.append('image', image);

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_IMAGE_UPLOAD_KEY}`;

        const res = await axios.post(imageUploadUrl, formData);

        console.log(res.data.data.url);

    }

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Register</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="fieldset space-y-2">

                    <div className='space-y-1'>
                        <label className="label">Your Name</label>
                        <input type="text"
                            {...register('name', { required: true })}
                            className="input" placeholder="Your Name" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500'>Name is required.</p>
                        }
                    </div>

                    <div className='space-y-1'>
                        <label className="label">Email</label>
                        <input type="email"
                            {...register('email', { required: true })}
                            className="input" placeholder="Email" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500'>Email is required.</p>
                        }
                    </div>

                    <div>
                        <label className="label">Password</label>
                        <input type="password"
                            {...register('password', { required: true, minLength: 6 })}
                            className="input" placeholder="Password" defaultValue='123456' />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password is required.</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters.</p>
                        }
                    </div>

                    <div className='space-y-1'>
                        <label className="label">Your Photo</label>
                        <input type="file"
                            {...register('photo')}
                            onChange={handlePhotoUpload}
                            className="input" placeholder="Upload your profile picture" />
                       
                    </div>

                    <div><a className="link link-hover">Forgot password?</a></div>

                    <button className="btn btn-neutral mt-4">Register</button>
                </form>

                <p><small>Already have an account? please <Link to='/auth' className='btn btn-link btn-sm bg-base-300'>Login</Link> here. </small></p>
            </div>
        </div>
    )
}

export default Register