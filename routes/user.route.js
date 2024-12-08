const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.post('/survey', userController.saveSurveyData);

module.exports = [
  router
]