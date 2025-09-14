import React from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const User = ({ user, index, refetch }) => {

    const { email, role } = user;

    const axiosSecure = useAxiosSecure();

    const handleChangeRole = (email, userRole) => {

        axiosSecure.patch(`/users/${email}/role`, {role: userRole})
            .then(res => {
                console.log(res.data);
                 refetch();
            })        
            .catch(error => {
                console.log(error.message);
            })
    }

    return (
        <tr>
            <th>{index + 1}</th>
            <td>{email}</td>
            <td>{role}</td>
            <td className='space-x-2'>
                <span onClick={() => handleChangeRole(email, 'admin')} 
                disabled={role ==='admin'} 
                className='btn btn-sm'>Change to <br />Admin</span>

                <span onClick={() => handleChangeRole(email, 'vendor')} 
                disabled={role === 'vendor'} 
                className='btn btn-sm'>Change to <br /> Vendor</span>

                <span onClick={() => handleChangeRole(email, 'user')} 
                disabled={role === 'user'} 
                className='btn btn-sm'>Change to <br /> User</span>
            </td>
        </tr>
    )
}

export default User