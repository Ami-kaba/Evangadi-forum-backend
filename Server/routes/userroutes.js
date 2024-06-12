const express = require("express");
const router = express.Router();
//Authentication
const authMiddleware = require("../Middleware/authmiddleware")

const {register, login, check} = require('../Controller/usercontroller')
router.post("/register", register)
router.post("/login", login)
router.get("/check",authMiddleware, check)

module.exports =  router 