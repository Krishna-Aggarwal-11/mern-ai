const express = require("express");
const  isAuthenticated  = require("../middlewares/isAuthenticated.js");
const { openAiController } = require("../controllers/openAiController.js");


const router = express.Router();

router.post("/generate-content" , isAuthenticated , openAiController); 

module.exports = router