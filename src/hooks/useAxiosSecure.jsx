import axios from 'axios'
import React from 'react'
import useAuth from './useAuth'
import LoadingSmall from '../components/LoadingSmall/LoadingSmall'

const axiosSecure = axios.create({
    baseURL: `https://fresh-market-server-eight.vercel.app`
})

const useAxiosSecure = () => {

    const {user, loading} = useAuth();

    if (loading){
        return <LoadingSmall />
    }

    axiosSecure.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`
        return config;
    }, error => {
        return Promise.reject(error);
    })
    return axiosSecure;
}

export default useAxiosSecure