import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "http://10.124.11.31:3000",
    headers: {
        "Content-Type": "application/json",
    }
})