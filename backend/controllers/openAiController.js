const asyncHandler = require("express-async-handler")
const axios = require("axios")
const ContentHistory = require("../models/ContentHistory.js")
const User = require("../models/User.js")
const openAiController = asyncHandler(async (req, res) => {
    const { prompt } = req.body
    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'gpt-3.5-turbo-instruct',
            prompt,
            max_tokens: 70
        },{
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
        })

        const content = response?.data?.choices[0].text?.trim()
        const newContent = await ContentHistory.create({user : req?.user?.id , content })
        const userFound = await User.findById(req?.user?.id)
        userFound.history.push(newContent?._id)
        userFound.apiRequestCount = userFound.apiRequestCount + 1
        await userFound.save()
        res.status(200).json( content )
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {openAiController}