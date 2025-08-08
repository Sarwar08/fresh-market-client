import React from 'react'
import dummyProfileImg from '../../assets/dummyProfileImg.jpg'
import useAuth from '../../hooks/useAuth'
import LogOut from '../Authentication/LogOut/LogOut';
import { Link } from 'react-router';
import { FaRegUser, FaUser } from "react-icons/fa";

const UserProfile = () => {

    const { user } = useAuth();

    return (
        <div>
            {
                user ?
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            {user?.photoURL ?
                                user?.photoURL
                                :
                                <img className='h-8 w-8 rounded-2xl ml-2' src={dummyProfileImg} />
                            }
                        </div>
                        <div
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 right-0 shadow border">
                            {
                                user &&
                                <div>
                                    <p>{user?.email}</p>
                                    <p>Name: {user.displayName ? user.displayName : "Not Found"}</p>
                                    
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