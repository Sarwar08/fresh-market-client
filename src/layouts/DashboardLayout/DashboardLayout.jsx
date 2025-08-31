import React from 'react'
import Logo from '../../pages/shared/Logo/Logo'
import { Link, NavLink, Outlet } from 'react-router'
import ThemeController from '../../pages/shared/Navbar/ThemeController'
import useUserRole from '../../hooks/useUserRole'

const DashboardLayout = () => {

    const { role, roleLoading } = useUserRole();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <div className="navbar bg-base-300 w-full">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className='lg:hidden'>
                        <Logo />
                    </div>
                    <div className="mx-2 flex-1 px-2 flex gap-2">
                        <h1 className='text-center text-3xl font-semibold border-b-2 bg-green-100/50 text-amber-400 flex-1 '>Dashboard</h1>
                        <ThemeController />
                    </div>

                </div>
                {/* Page content here */}
                <Outlet />
                {/* Page content here */}
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <div className='mb-4 border-b-2 border-amber-300 pb-2'>
                        <Logo />
                    </div>
                    <li><NavLink to='/dashboard'>Home</NavLink></li>
                    <li>
                        <Link to='/postAItem'>Post A Item open</Link>
                    </li>

                    {/* users links */}
                    {
                        !roleLoading && role === 'user' && <>
                            <li><a>User Home</a></li>
                        </>
                    }

                    {/* vendors Link */}
                    {
                        !roleLoading && role === 'vendor' && <>
                            <li>
                                <a href="">Vendor Home</a>
                            </li>
                            <li>
                                <Link to='/postAItem'>Post A Item</Link>
                            </li>
                        </>
                    }

                    {/* admin links */}
                    {
                        !roleLoading && role === 'admin' && <>
                            <li>
                                <a href="">Admin Home</a>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </div>
    )
}

export default DashboardLayout