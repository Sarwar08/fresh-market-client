import React from 'react'
import { BiSolidEditAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const CartProduct = ({ product, index, refetch }) => {

    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();

    const { _id: cart_id, itemName, itemImage, unit, qty, price, totalPrice, payment_status } = product;

    const handlePay = (id) => {
        navigate(`/dashboard/payment/${id}`);
    }

    const handleDelete = async (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            background: "#B20000",
            color: "#fff",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                background: "#B20000",
                                color: "#fff",
                                icon: "success"
                            });
                        }
                        refetch();
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
            }
        });
    }

    if (payment_status === 'pending') {
        return (
            <tr>
                <th>
                    {index + 1}
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
                    <button onClick={() => handleDelete(cart_id)} disabled={payment_status === 'paid'} className="btn btn-error btn-sm"><MdDelete size={18} /></button>
                </th>
            </tr>
        )
    }

}

export default CartProduct