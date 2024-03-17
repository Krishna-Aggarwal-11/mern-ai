const asyncHandler = require("express-async-handler");
const stripe = require("stripe")("sk_test_51OtWF1SJZnL5mNpgcdLUNafItnxgrMwlcdhqs9IubigPOFXnfqY078Junz2hkVNgozyni0Qhku4x0NWTQO3AfTgC002re4V8NR");
const handleStripePayment = asyncHandler(async (req, res) => {
    const { amount, subscriptionPlan } = req.body;
    const user = req?.user;
    console.log(user)
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount:Number(amount)*100,
            currency: "inr",
            metadata:{
                userId : user?._id.toString(),
                userEmail : user?.email,
                subscriptionPlan
            }
        })
        res.json({
            clientSecret : paymentIntent.client_secret,
            paymentIntent : paymentIntent?.id,
            metadata : paymentIntent?.metadata
        })
    }catch (error) {
        
        throw new Error(error)
    }
}); 

const handleFreeSubscription = asyncHandler(async (req, res) => {
    const user = req?.user;
    

})

module.exports = {handleStripePayment, handleFreeSubscription}