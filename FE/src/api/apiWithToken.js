
import axios from "axios";

const accessToken = localStorage.getItem('accessToken')

export default axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
})