const asyncHandler = require("express-async-handler");
const { calculateNextBill } = require("../utils/calculateNextBill");
const stripe = require("stripe")("sk_test_51OtWF1SJZnL5mNpgcdLUNafItnxgrMwlcdhqs9IubigPOFXnfqY078Junz2hkVNgozyni0Qhku4x0NWTQO3AfTgC002re4V8NR");
const {RenewSubscription} = require("../utils/RenewSubscription.js");
const Payment = require("../models/Payment.js");
const User = require("../models/User.js");


const handleStripePayment = asyncHandler(async (req, res) => {
    const { amount, subscriptionPlan } = req.body;
    const user = req?.user;
    
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

const verifyPayment = asyncHandler(async (req, res) => {
    const {paymentId} = req.params
    try {
        const payment = await stripe.paymentIntents.retrieve(paymentId);
        
        if (payment.status !== "succeeded") {
            const metadata = payment?.metadata;
            const subscriptionPlan = metadata?.subscriptionPlan;
            const userEmail = metadata?.userEmail;
            const userId = metadata?.userId;
            
            const userFound = await User.findById(userId)
            if (!userFound) {
                return res.status(404).json({
                    status : "false",
                    message : "User not found"
                })
            }

            const amount = payment?.amount / 100;
            const currency = payment?.currency;
            const paymentId = payment?.id;
            
            const newPayment = await Payment.create({
                user : userId,
                subscriptionPlan,
                email : userEmail,
                amount,
                currency,
                paymentId,
                status:"success",
                reference:paymentId
            })

            if (subscriptionPlan ==="Basic") {
                const updatedUser = await User.findByIdAndUpdate(userId, {
                    subscription : "Basic",
                    trialPeriod : 0,
                    apiRequestCount : 0,
                    monthlyRequestCount : 50,
                    nextBillingDate : calculateNextBill(),
                    $addToSet : {
                        payment : newPayment?._id
                    }
                })
                res.json({
                    status : "success",
                    message : "Payment verified successfully",
                    user : updatedUser
                })
            }
            if (subscriptionPlan ==="Premium")  {
                const updatedUser = await User.findByIdAndUpdate(userId, {
                    subscription : "Premium",
                    trialPeriod : 0,
                    apiRequestCount : 0,
                    monthlyRequestCount : 100,
                    nextBillingDate : calculateNextBill(),
                    $addToSet : {
                        payment : newPayment?._id
                    }
                })
                res.json({
                    status : "success",
                    message : "Payment verified successfully",
                    user : updatedUser
                })
            }

        }
    } catch (error) {
        throw new Error(error)
    }    

})


const handleFreeSubscription = asyncHandler(async (req, res) => {
    const user = req?.user;
    
    try {
        if (RenewSubscription(user)) {
            user.subscription = "Free"
            user.monthlyRequestCount = 5
            user.apiRequestCount = 0;
            user.nextBillingDate = calculateNextBill()
        


            const newPayment = await Payment.create({
                user : user._id,
                subscriptionPlan : "Free",
                amount : 0,
                status : "success",
                reference : Math.random().toString(36).substring(7),
                monthlyRequestCount : 5,
                currency : "inr"

            })

            user.payment.push(newPayment?._id)

            await user.save()
            return res.json({
                status : "success",
                message : "Subscription renewed successfully",
                user
            })
            
        }else{
            return res.status(403).json({
                error : "Subscription renewal not due yet"
            })
        }
    } catch (error) {
        throw new Error(error)
    }

})

module.exports = {handleStripePayment, handleFreeSubscription , verifyPayment}