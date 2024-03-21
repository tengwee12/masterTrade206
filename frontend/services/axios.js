import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "http://192.168.86.21:3000",
    headers: {
        "Content-Type": "application/json",
    }
})