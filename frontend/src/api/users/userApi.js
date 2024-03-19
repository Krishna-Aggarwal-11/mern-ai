import axios from "axios";

export const registerUser = async(userData) => {
    const response = await axios.post("http://localhost:4000/api/vi/users/register", {
        email : userData?.email,
        password : userData?.password,
        username : userData?.username
    },
    {
        withCredentials: true
    }
    );

    return response?.data
} 

export const loginUser = async(userData) => {
    const response = await axios.post("http://localhost:4000/api/vi/users/login", {
        email : userData?.email,
        password : userData?.password,
        username : userData?.username
    },
    {
        withCredentials: true
    }
    );

    return response?.data
} 