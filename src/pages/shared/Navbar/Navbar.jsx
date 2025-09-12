import React from 'react'
import Logo from '../Logo/Logo'
import { Link, NavLink } from 'react-router'

import ThemeController from './ThemeController';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import useAuth from '../../../hooks/useAuth';
import LoadingSmall from '../../../components/LoadingSmall/LoadingSmall';
import UserProfile from '../../UserProfile/UserProfile';

const Navbar = () => {

    const { loading } = useAuth();

    const links = <>
        <li><NavLink to='/' className='border-b-2 border-base-100' >Home</NavLink></li>
        <li><NavLink to='/dashboard' className='border-b-2 border-base-100' >Dashboard</NavLink></li>
        <li><NavLink to='/shop' className='border-b-2 border-base-100' >Shop</NavLink></li>
    </>

    return (
        <nav className="flex shadow-sm bg-base-100/50 sticky top-0 z-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <div className='ml-2 block'>
                    <Logo />
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal -p-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end mr-2">
                <ThemeController />
                {
                    loading ?
                        <LoadingSmall />
                        :
                        <UserProfile />
                }
            </div>
        </nav>
    )
}

export default Navbar