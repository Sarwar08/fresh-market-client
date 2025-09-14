import React from 'react'
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyProduct = ({ product, index, refetch }) => {

    const axiosSecure = useAxiosSecure();

    const { _id, itemName, itemImage, marketName, date, status, price, unit } = product;

    const newDate = date.slice(0, 10);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/products/${id}`)
                    .then(res => {
                        console.log(res.data);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });

                        refetch();
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
            }
        });
    }

    return (
        <tr className='space-x-2'>
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
            <td>{price} Taka / {unit}</td>
            <td>{marketName}</td>
            <td>{newDate}</td>
            <td>{status}</td>
            <th className='flex gap-1'>
                <Link to={`/products/${_id}`} className="btn btn-info btn-sm"> View </Link>
                <Link to={`/dashboard/editProduct/${_id}`} className="btn btn-info btn-sm"><BiSolidEditAlt size={18} /></Link>
                <button onClick={() => handleDelete(_id)} className="btn btn-error btn-sm"><MdDelete size={18} /></button>
            </th>
        </tr>
    )
}

export default MyProduct