import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import banner1 from '../../../assets/banners/banner-1.jpg'
import banner2 from '../../../assets/banners/banner-2.jpg'
import banner3 from '../../../assets/banners/banner-3.jpg'
import banner4 from '../../../assets/banners/banner-4.jpg'
import banner5 from '../../../assets/banners/banner-5.jpg'

const Banner = () => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true} centerMode={true}centerSlidePercentage={90} className='max-w-4xl mx-auto m-4' >
            <div className=''>
                <img src={banner1} className=''/>
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src={banner2} />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src={banner3} />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src={banner4} />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src={banner5} />
                <p className="legend">Legend 1</p>
            </div>
            
            
        </Carousel>
    )
}

export default Banner