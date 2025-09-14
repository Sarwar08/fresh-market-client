import React from 'react'
import Logo from '../Logo/Logo'
import { FaFacebook, FaInstagramSquare, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-base-300/70 text-base-content p-10">
            <aside>
                <Logo />
                <p>
                    FreshMarket Industries Ltd.
                    <br />
                    Providing reliable tech since 1992
                </p>
                <div>

                </div>
            </aside>
            <nav>
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title ">Social Media Links</h6>
                <div className='flex justify-between gap-2 *:text-2xl'>
                    <span className="link link-hover text-blue-500"> <FaFacebook /> </span>
                    <span className="link link-hover text-gray-300"><FaXTwitter /></span>
                    <span className="link link-hover text-yellow-500"><FaInstagramSquare /></span>
                    <span className="link link-hover text-blue-300"><FaLinkedin /></span>
                </div>
            </nav>
        </footer>
    )
}

export default Footer