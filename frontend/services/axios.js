import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "http://192.168.18.15:3000",
    headers: {
        "Content-Type": "application/json",
    }
})