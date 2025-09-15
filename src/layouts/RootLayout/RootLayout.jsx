import React from 'react'
import Navbar from '../../pages/shared/Navbar/Navbar'
import Footer from '../../pages/shared/Footer/Footer'
import { Outlet } from 'react-router'

const RootLayout = () => {
    return (
        <div className='bg-[url(/bgImages/bgImg2.jpg)] bg-violet-900/90 bg-blend-multiply bg- bg-center bg-repeat-y'>
            <Navbar />
            <div className='min-h-screen p-2'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default RootLayout