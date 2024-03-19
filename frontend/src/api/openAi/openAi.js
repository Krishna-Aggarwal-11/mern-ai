import axios from "axios";

export const generateContent = async({prompt}) => {
    const response = await axios.post("http://localhost:4000/api/vi/openai/generate-content", {
        prompt
    },
    {
        withCredentials: true
    }
    );

    return response?.data
}