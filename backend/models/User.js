const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    trialActive: {
        type: Boolean,
        required: true
    },
    trialExpires: {
        type: Boolean,
        required: true
    },
    subscription: {
        type : String,
        enum : ['free', 'Basic' , 'Premium' , 'Trial'],
    },
    apiRequestCount: {
        type : Number,
        default : 0,
    },
    monthlyRequestCount: {
        type : Number,
        default : 0,
    },
    nextBillingDate: {
        type: Date,
        
    },
    payment :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Payment'
        }
    ],
    history :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'History'
        }
    ],
},{
    timestamps: true
})

const User = mongoose.model('User', userSchema) ; 
module.exports = User ; 