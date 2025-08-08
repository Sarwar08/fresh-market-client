import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import useAuth from '../../../hooks/useAuth'


const Login = () => {

    const {loginUser} = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);

        loginUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    return (

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Login now!</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="fieldset space-y-2">

                    <div className='space-y-1'>
                        <label className="label">Email</label>
                        <input type="email"
                            {...register('email', { required: true })}
                            className="input" placeholder="Email" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500'>Email is Required.</p>
                        }
                    </div>

                    <div className='space-y-1'>
                        <label className="label">Password</label>
                        <input type="password"
                            {...register('password', { required: true })}
                            className="input" placeholder="Password" defaultValue='123456' />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password is Required.</p>
                        }
                    </div>

                    <div><a className="link link-hover">Forgot password?</a></div>

                    <button className="btn btn-neutral mt-4">Login</button>
                </form>

                <p><small>Dont have an account? please <Link to='/auth/register' className='btn btn-link btn-sm bg-base-300'>Register</Link> here. </small></p>
            </div>
        </div>

    )
}

export default Login