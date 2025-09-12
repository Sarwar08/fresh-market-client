import React from 'react'
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const Product = ({product, index}) => {
  
      const { itemName, itemImage, marketName, date, status, price, unit } = product;
  
      const newDate = date.slice(0, 10);
  
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
                  <button className="btn btn-info btn-sm"><BiSolidEditAlt size={18} /></button>
                  <button className="btn btn-error btn-sm"><MdDelete size={18} /></button>
              </th>
          </tr>
      )
  }

export default Product