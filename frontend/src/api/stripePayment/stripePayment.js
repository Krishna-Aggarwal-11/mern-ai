import axios from "axios";

export const handleFreeSubscription = async() => {
    const response = await axios.post("http://localhost:4000/api/vi/stripe/free-plan", {
    },
    {
        withCredentials: true
    }
    );

    return response?.data
}
export const createStripePayment = async(payment) => {
    const response = await axios.post("http://localhost:4000/api/vi/stripe/checkout", {
        amount : Number(payment?.amount),
        subscriptionPlan : payment?.subscriptionPlan
    },
    {
        withCredentials: true
    }
    );

    return response?.data
}
export const verifyStripePayment = async( paymentId) => {
    const response = await axios.post(`http://localhost:4000/api/vi/stripe/verify-payment/${paymentId}`, {
        
    },
    {
        withCredentials: true
    }
    );

    return response?.data
}