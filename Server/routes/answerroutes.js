const express = require("express");
const router = express.Router();


const {allAnswers, Answer} = require('../Controller/answercontroller')
router.get("/allAnswers", allAnswers)
router.post("/answer", Answer)

module.exports = router;