const asyncHandler = require("express-async-handler")
const User = require("../models/User.js")

const checkApiRequestLimit = asyncHandler(async (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({message : "Unauthorized"})
    }

    const user = await User.findById(req?.user?.id)
    if(!user) {
        return res.status(404).send({message : "User not found"})
    }

    let requestLimit = 0 
    if (user?.isTrialActive) {
        requestLimit = user?.monthlyRequestCount
    }
    if (user?.apiRequestCount >= requestLimit) {
        throw new Error("Api request limit exceeded")
    }
    next() 
})