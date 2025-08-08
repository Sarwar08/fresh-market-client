import React from 'react'
import Navbar from '../../pages/shared/Navbar/Navbar'

import Footer from '../../pages/shared/Footer/Footer'
import { Outlet } from 'react-router'
import Lottie from 'lottie-react'
import authLottie from '../../assets/lotties/authLottie.json';

const AuthLayout = () => {
    return (
        <div>
            <Navbar />
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col-reverse lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <Lottie
                            animationData={authLottie}
                            className="max-w-sm rounded-lg shadow-2xl"
                        />
                    </div>
                    <Outlet />
                </div>
            </div>
            
            <Footer />
        </div>
    )
}

export default AuthLayout