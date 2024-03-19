import axios from "axios";

export const registerUser = async(userData) => {
    const response = await axios.post('https://localhost:4000/api/v1/users/register', {
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