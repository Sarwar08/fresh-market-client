import React from 'react'
import { BiSolidEditAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router';

const MyAd = ({ ad, index, refetch }) => {

    const axiosSecure = useAxiosSecure();

    const { _id, adTitle, adDescription, status, image } = ad;

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
                axiosSecure.delete(`/advertisements/${id}`)
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
        <tr className='space-x-2 '>
            <th>
                {index + 1}
            </th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={image}
                                alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                </div>
            </td>
            <td>
                {adTitle}
            </td>
            <td>{adDescription}</td>
            <td>{status}</td>
            <th className='flex gap-1'>
                <Link to={`/dashboard/editAd/${_id}`} className="btn btn-info btn-sm"><BiSolidEditAlt size={18} /></Link>
                <button onClick={() => handleDelete(_id)} className="btn btn-error btn-sm"><MdDelete size={18} /></button>
            </th>
        </tr>
    )
}

export default MyAd