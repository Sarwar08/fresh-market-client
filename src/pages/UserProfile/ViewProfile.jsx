import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const ViewProfile = () => {

    const axiosSecure = useAxiosSecure();


    const {data, isLoading} = useQuery({
        queryKey: ['user-role'],
        queryFn: async () => {
            const res = await axiosSecure.get()
        }
    })

  return (
    <div>ViewProfile</div>
  )
}

export default ViewProfile