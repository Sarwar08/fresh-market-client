import React from 'react'
import { Link } from 'react-router';

const Product = ({ product }) => {

    const { _id, itemName, itemImage, price, unit, adOffer } = product;

    return (
        <div className="card bg-base-100 shadow-sm relative">
            <figure>
                <img
                    src={itemImage} />
            </figure>
            <div className="card-body">
                {adOffer && <span className='bg-green-500 rounded px-2 font-bold absolute top-0 left-0'>{adOffer} Discount</span>}
                <h2 className="card-title">{itemName}</h2>
                <p>{price} BDT / {unit}</p>
                <div className="card-actions justify-end">
                    <Link to={`/products/${_id}`} className="btn btn-primary mt-3">View Details</Link>
                </div>
            </div>
        </div>
    )
}

export default Product