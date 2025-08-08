import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'


const Login = () => {

    useForm();

    return (

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Login now!</h1>
                <fieldset className="fieldset">
                    
                    <label className="label">Email</label>
                    <input type="email" className="input" placeholder="Email" />
                    
                    <label className="label">Password</label>
                    <input type="password" className="input" placeholder="Password" />
 
                    <div><a className="link link-hover">Forgot password?</a></div>
                    
                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>

                <p><small>Dont have an account? please <Link to='/auth/register' className='btn btn-link btn-sm bg-base-300'>Register</Link> here. </small></p>
            </div>
        </div>

    )
}

export default Login