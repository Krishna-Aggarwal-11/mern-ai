const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../models/User.js")

const isAuthenticated = asyncHandler( async(req, res , next) => {
    if (req.cookies.token) {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded?.id).select("-password")
        return next()
    }else{
        res.status(401)
        throw new Error("Not authorized, please login")
    }
    next()
})

module.exports = isAuthenticated;