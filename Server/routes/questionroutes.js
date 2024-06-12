const express = require("express");
const router = express.Router();


const {allQuestions, Questions} = require('../Controller/quationcontroller')
router.get("/questions", allQuestions)
router.post("/ask", Questions)

module.exports = router