import React from 'react'
import { Link } from 'react-router';

const ProductForShop = ({ product }) => {

    const { _id, itemName, itemImage, marketDescription, price, unit, itemDescription, adOffer } = product;

    return (
        <div className="card bg-base-100 shadow-sm relative">
            <figure>
                <img
                    src={itemImage} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{itemName}</h2>
                <p>{itemDescription}</p>
                <p>{price} BDT / {unit}</p>
                {adOffer && <p className='bg-green-500 rounded px-2 font-bold absolute'>{adOffer} Discount</p>}
                <div className="card-actions justify-end">
                    <Link to={`/products/${_id}`} className="btn btn-primary">Buy Now</Link>
                </div>
            </div>
        </div>
    )
}

export default ProductForShop