import React from 'react'
import { Link } from 'react-router'

const Logo = () => {
    return (
        <Link to='/' className='text-xl font-semibold p-1 bg-gray-950 rounded-md'>
            <span className='text-green-300'>
                <span className='border-2 border-orange-400 pt-5'>
                    <span className='text-5xl px-1 '>F</span>
                </span>
                <span className='ml-0.5 border-b-2'>resh</span>
            </span>
            <span className='text-orange-300 border-b-2'>Market</span>
        </Link>
    )
}

export default Logo