const express = require("express");
const foodController = require("../controllers/food.controller");

const router = express.Router();

router.get('/', foodController.foodsPage);

router.get('/settings', foodController.anketPage); // user can select like, dislike tags of food
router.post('/settings', foodController.anketRequest);

router.get('/create', foodController.createFoodPage); // add new food
router.post('/create', foodController.createFoodRequest);

router.get('/:id', foodController.foodDetailPage); // detail of one food

module.exports = [
  router
]
