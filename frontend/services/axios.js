import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "http://192.168.189.7:3000",
    headers: {
        "Content-Type": "application/json",
    }
})