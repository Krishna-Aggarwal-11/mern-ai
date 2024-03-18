const { models } = require("mongoose")
const User = require("../models/User.js")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const register = asyncHandler(async (req, res , next) => {
        const { username, email, password } = req.body ; 
        if (!username || !email || !password) {
            res.status(400)
            throw new Error("Please add all fields")
        }

        const userExists = await User.findOne({email})

        if (userExists) {
            res.status(400)
            throw new Error("User already exists")
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const createUser = await User.create({
            username,
            email,
            password: hashedPassword
        })

        createUser.trialExpires = new Date(
            new Date().getTime() + createUser.trialPeriod * 24 * 60 * 60 * 1000
        )

        await createUser.save();

        res.json({
            status :true,
            message : "User created successfully",
            user : {
                username,
                email
            }
        })
})

const login = asyncHandler(async (req, res , next) => {
    const { email, password } = req.body;
    const user = await User.findOne({email})  
    if (!user) {
        res.status(400)
        throw new Error("Invalid credentials")
    }

    const isMatch = await bcrypt.compare(password, user?.password)

    if (!isMatch) {
        res.status(400)
        throw new Error("Invalid credentials")
    }

    const token = jwt.sign({id : user?._id}, process.env.JWT_SECRET, {expiresIn : "30d"})

    res.cookie("token", token, {
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        sameSite : "strict",
        maxAge :  24 * 60 * 60 * 1000
    })


    res.json({
        status : true,
        message : "User logged in successfully",
        username : user?.username,
        email : user?.email,
        _id : user?._id
    })
})

const logout = asyncHandler(async (req, res , next) => {
    res.cookie("token", "", {maxAge : 1})
    res.status(200).json({status : true, message : "User logged out successfully"})
})

const userProfile = asyncHandler(async (req, res , next) => {

    const user = await User.findById(req?.user?.id).select('-password').populate("payment").populate("history")
    if (user) {
        res.status(200).json({
            status : true,
            user
        })
    }else{
        res.status(404)
        throw new Error("User not found")
    }
})

const checkAuth = asyncHandler(async (req, res , next) => {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
    if (decoded) {
        res.json({
            isAuthenticated : true
        })
    }else{
        res.json({
            isAuthenticated : false
        })
    }
})




module.exports = {
    register,
    login,
    logout,
    userProfile,
    checkAuth
}