const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.post('/survey', userController.saveSurveyData);
router.get('/get-all-user', userController.getAllUser);
router.post('/like-post', userController.processUserLikePost);
router.get('/get-user-favourite-post', userController.getAllFavoritePostOfUser);

module.exports = [
  router
]