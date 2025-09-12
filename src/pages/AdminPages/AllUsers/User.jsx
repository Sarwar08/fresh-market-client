import React from 'react'

const User = ({ user, index }) => {

    const { email, role } = user;

    return (
        <tr>
            <th>{index + 1}</th>
            <td>{email}</td>
            <td>{role}</td>
            <td>Change Role</td>
        </tr>
    )
}

export default User