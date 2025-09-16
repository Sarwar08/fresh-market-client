import axios from 'axios'
import React from 'react'

const axiosInstance = axios.create({
    baseURL: `https://fresh-market-server-eight.vercel.app`,
})

const useAxios = () => {
    return axiosInstance;
}

export default useAxios