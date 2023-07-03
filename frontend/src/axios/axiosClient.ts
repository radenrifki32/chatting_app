import axios from "axios";

const apiClient = axios.create({
    baseURL : "http://localhost:8080",
    headers : {
        "Content-type": "application/json",

    },
    withCredentials :true
})

  export default apiClient