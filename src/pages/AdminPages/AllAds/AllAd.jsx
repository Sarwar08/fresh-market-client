import React from 'react'
import { BiSolidEditAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllAd = ({ ad, index, refetch }) => {

    const axiosSecure = useAxiosSecure();

    const { _id, adTitle, adDescription, status, image, email } = ad;

    const handleDecision = async (id, action, email) => {

        const confirm = await Swal.fire({
            title: `${action === 'accepted' ? "Accept" : 'Reject'} the application?`,
            icon: "warning",
            background: '#073A67',
            color: "#fff",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        });

        if (!confirm.isConfirmed) return;

        try {
            const status = action === "accepted" ? "accepted" : "rejected";
            await axiosSecure.patch(`/advertisements/${id}/status`, {
                status, 
                email,
            });

            refetch();

            Swal.fire("Success", `Ad ${action} successfully`, "success" );

        } catch (error) {
            Swal.fire("Error", `Could not update status.`, error );
        }
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
                <button onClick={() => handleDecision(_id, 'accepted', email)} className="btn btn-info btn-sm"><FaCheck /></button>
                <button onClick={() => handleDecision(_id, 'rejected', email)} className="btn btn-error btn-sm"><FaTimes /></button>
                {/* <button className="btn btn-error btn-sm"><MdDelete size={18} /></button> */}
            </th>
        </tr>
    )
}

export default AllAd;