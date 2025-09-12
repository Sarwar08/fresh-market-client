import React from 'react'
import Banner from '../Banner/Banner'
import Products from '../Products/Products'
import AdHighlights from '../AdHighlights/AdHighlights'
import WeeklyPriceTrends from '../WeeklyPriceTrend/WeeklyPriceTrend'
import QuoteSection from '../QuoteSection/QuoteSection'

const Home = () => {
    return (
        <div className=''>
            <div className='banner-section'>
                <Banner />
            </div>

            <div className='products-section my-16'>
                <Products />
            </div>

            <div className='ad-highlights my-16'>
                <AdHighlights />
            </div>

            <div className='extra-section-2 my-16'>
                <QuoteSection />
            </div>

            <div className='extra-section-1 my-16'>
                <WeeklyPriceTrends />
            </div>
        </div>
    )
}

export default Home