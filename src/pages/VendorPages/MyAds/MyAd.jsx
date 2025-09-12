import React from 'react'
import { BiSolidEditAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

const MyAd = ({ad, index}) => {

    const {adTitle, adDescription, status, image } = ad;

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
                    <button className="btn btn-info btn-sm"><BiSolidEditAlt size={18} /></button>
                    <button className="btn btn-error btn-sm"><MdDelete size={18} /></button>
                </th>
            </tr>
  )
}

export default MyAd