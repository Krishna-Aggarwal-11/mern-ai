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
    trialPeriod: {
        type: Number,
        default : 3
    },
    trialActive: {
        type: Boolean,
        default: true
    },
    trialExpires: {
        type: Date,
    },
    subscription: {
        type : String,
        enum : ['Free', 'Basic' , 'Premium' , 'Trial'],
    },
    apiRequestCount: {
        type : Number,
        default : 0,
    },
    monthlyRequestCount: {
        type : Number,
        default : 100,
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

userSchema.virtual('isTrialActive').get(function(){
    return this.trialActive && this.trialExpires > Date.now()
})

const User = mongoose.model('User', userSchema) ; 
module.exports = User ; 