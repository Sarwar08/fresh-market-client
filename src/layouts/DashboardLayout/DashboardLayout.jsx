import React from 'react'
import Logo from '../../pages/shared/Logo/Logo'
import { Link, NavLink, Outlet } from 'react-router'
import ThemeController from '../../pages/shared/Navbar/ThemeController'
import useUserRole from '../../hooks/useUserRole'
import UserProfile from '../../pages/UserProfile/UserProfile'
import Loading from '../../components/Loading/Loading'

const DashboardLayout = () => {


    const { role, roleLoading } = useUserRole();

    if (roleLoading) {
        <Loading />
    }


    return (
        <div className="drawer md:drawer-open bg-[url(/bgImages/bgImg2.jpg)] bg-violet-900/60 bg-blend-multiply bg-cover bg-center ">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
           
            <div className="drawer-content">

                {/* Navbar */}
                <div className="navbar bg-base-300/60 w-full sticky top-0 z-50">
                    <div className="flex-none md:hidden">
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
                    <div className='md:hidden'>
                        <Logo />
                    </div>
                    <div className="md:mx-2 flex-1 px-2">
                        <Link to='/dashboard'><h1 className='text-center md:text-3xl font-semibold border-b-2 bg-violet-800/30 text-amber-400'>Dashboard</h1></Link>
                    </div>
                        <UserProfile />
                </div>

                {/* Page content here */}
                <div className=' min-h-screen 
                bg-[url(/bgImages/bgImg1.png)]
                 bg-violet-950/80 bg-blend-multiply bg-cover bg-center p-4'>
                    <Outlet />
                </div>
                {/* Page content here */}
            </div>

            {/* sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

                <ul className="menu text-base-content min-h-full w-48 p-4 
                bg-violet-800/30 bg-blend-multiply bg-cover bg-center border-r border-amber-700">
                    {/* Sidebar content here */}
                    <div className='mb-4 border-b-2 border-amber-300 pb-2'>
                        <Logo />
                    </div>
                    {/* <li><NavLink to='/dashboard'>Home</NavLink></li> */}

                    <li>
                        <NavLink to ='/dashboard/myWishlist'> My Wishlist </NavLink>
                    </li>
                    <li>
                        <NavLink to ='/dashboard/myCart'> My Cart </NavLink>
                    </li>
                    <li>
                        <NavLink to ='/dashboard/myOrders'> My Orders </NavLink>
                    </li>

                    {/* users links */}
                    {
                        !roleLoading && role === 'user' && <>
                            <li>
                                <Link to='/dashboard'>User Home</Link>
                            </li>
                        </>
                    }

                    {/* vendors Link */}
                    {
                        !roleLoading && role === 'vendor' && <div className='border border-amber-700 rounded-2xl bg-amber-700/20 my-4'>
                            <li>
                                <Link to='/dashboard'>Vendor Home</Link>
                            </li>
                            <li>
                                <Link to='/addProduct'>Add Product</Link>
                            </li>
                            <li>
                                <NavLink to='/dashboard/myProducts'>My Products</NavLink>
                            </li>
                            <li>
                                <Link to='/addAd'>Add Advertisement</Link>
                            </li>
                            <li>
                                <NavLink to='/dashboard/myAds'>My Advertisement</NavLink>
                            </li>
                        </div>
                    }

                    {/* admin links */}
                    {
                        !roleLoading && role === 'admin' && <div className='border border-amber-700 rounded-2xl bg-amber-700/20 my-4'>
                            <li>
                                <Link to='/dashboard'>Admin Home</Link>
                            </li>
                            <li>
                                <NavLink to='/dashboard/allUsers'>All Users</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/allProducts'>All Products</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/allAds'>All Advertisements</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/allOrders'>All Orders</NavLink>
                            </li>
                        </div>
                    }
                </ul>
            </div>
        </div>
    )
}

export default DashboardLayout