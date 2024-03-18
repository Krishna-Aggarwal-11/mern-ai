const express = require("express");
const {register , login , logout, userProfile, checkAuth} = require("../controllers/userControlller.js")
const isAuthenticated = require("../middlewares/isAuthenticated.js");

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);
router.get("/profile",isAuthenticated , userProfile);
router.get("/auth/check",isAuthenticated , checkAuth);


module.exports = router;