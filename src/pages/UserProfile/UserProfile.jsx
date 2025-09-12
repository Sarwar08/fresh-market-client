import React from 'react'
import dummyProfileImg from '../../assets/dummyProfileImg.jpg'
import useAuth from '../../hooks/useAuth'
import LogOut from '../Authentication/LogOut/LogOut';
import { Link } from 'react-router';
import { FaRegUser, FaUser } from "react-icons/fa";

const UserProfile = () => {

    const { user } = useAuth();

    return (
        <div className=''>
            {
                user ?
                    <div className="dropdown flex">
                        <div tabIndex={0} role="button" className="mr-4">
                                <img 
                                className='h-10 w-10 rounded-full ml-2' 
                                src={ user.photoURL ? user.photoURL : dummyProfileImg} />
                        </div>
                        <div
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 right-0 top-10 shadow border">
                            {
                                user &&
                                <div>
                                    <p>{user?.email}</p>
                                    <img src={user.photoURL} alt="" />
                                    <p>Name: {user.displayName ? user.displayName : "Not Found"}</p>
                                    <Link to='/auth/updateProfile' className='btn btn-sm btn-info'>Update</Link>
                                    <Link to='/auth/viewProfile' className='btn btn-sm mx-0.5 btn-info'>View</Link>
                                    <LogOut />
                                </div>

                            }
                        </div>
                    </div>
                    :
                    <Link to='/auth' className="btn"><FaUser size={20} /></Link>
            }
        </div>
    )
}

export default UserProfile