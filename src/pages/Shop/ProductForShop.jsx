import React from 'react'
import { Link } from 'react-router';

const ProductForShop = ({ product }) => {

    const { _id, itemName, itemImage, price, unit, itemDescription, adOffer, date, marketName, email } = product;

    return (
        <div className="card bg-base-100/50 shadow-sm relative">
            <figure>
                <img
                    src={itemImage} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{itemName}</h2>
                <p>{itemDescription}</p>
                <p>{price} BDT / {unit}</p>
                <p>{date.slice(0,10)}</p>
                <p>{marketName}</p>
                <p>{email}</p>
                {adOffer && <p className='bg-green-500 rounded px-2 font-bold absolute'>{adOffer} Discount</p>}
                <div className="card-actions justify-center mt-4">
                    <Link to={`/products/${_id}`} className="btn btn-sm btn-primary">View Details</Link>
                </div>
            </div>
        </div>
    )
}

export default ProductForShop