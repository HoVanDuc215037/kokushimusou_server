const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.get('/survey', userController.getSurvey);

router.post('/api/survey', userController.submitSurvey);

module.exports = router
