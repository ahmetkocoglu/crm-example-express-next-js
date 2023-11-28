import axios from "axios";
import { base } from '@/configs/base'

const request = axios.create({
    baseURL: base.base,
    timeout: 30000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

request.interceptors.request.use((config: any) => {
    const token = localStorage.getItem('token')
    config.headers = {
        ...config.headers,
        Authorization: `${token ?? ''}`
    }

    return config
}, (error) => {
    return Promise.reject(error)
})

export default request