import React from 'react'
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router';

const AllOrder = ({product, index}) => {
    const navigate = useNavigate();

    const { _id: cart_id, itemName, itemImage, unit, qty, price, totalPrice, payment_status } = product;

    const handlePay = (id) => {
        navigate(`/dashboard/payment/${id}`);
    }

    // setCount(count + 1);

    if (payment_status === 'paid') {
        
        return (
            <tr>
                <th>
                    {index+1}
                </th>
                <td>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                                <img
                                    src={itemImage}
                                    alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>

                    </div>
                </td>
                <td>
                    {itemName}
                </td>
                <td>{qty} {unit} x {price} BDT</td>
                <td>{totalPrice} BDT</td>
                <td>{payment_status}</td>
                <th className='flex gap-1'>
                    <button disabled={payment_status === 'paid'} onClick={() => handlePay(cart_id)} className="btn btn-info btn-sm">Pay Now</button>
                    <button disabled={payment_status === 'paid'} className="btn btn-error btn-sm"><MdDelete size={18} /></button>
                </th>
            </tr>
        )
    }

}

export default AllOrder