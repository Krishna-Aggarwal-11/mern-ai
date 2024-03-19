import axios from "axios";

export const generateContent = async(userPrompt) => {
    const response = await axios.post("http://localhost:4000/api/vi/openai/generate-content", {
        prompt : userPrompt
    },
    {
        withCredentials: true
    }
    );

    return response?.data
}