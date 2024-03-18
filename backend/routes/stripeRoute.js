const express = require("express");
const {handleStripePayment, verifyPayment} = require("../controllers/stripePayment.js");
const {handleFreeSubscription} = require("../controllers/stripePayment.js");
const isAuthenticated = require("../middlewares/isAuthenticated.js")
const router = express.Router();

router.post("/checkout" , isAuthenticated , handleStripePayment)
router.post("/free-plan" , isAuthenticated , handleFreeSubscription)
router.post("/verify-payment/:paymentId" , isAuthenticated , verifyPayment)
module.exports = router
