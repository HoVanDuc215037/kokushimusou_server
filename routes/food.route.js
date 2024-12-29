const express = require("express");
const foodController = require("../controllers/food.controller");

const router = express.Router();

router.get('/', foodController.foodsPage);

router.get('/favorites', foodController.favoritesPage);

router.get('/create', foodController.createFoodPage); // add new food
router.post('/create', foodController.createFoodRequest);

router.get('/:id', foodController.foodDetailPage);
router.delete('/:id', foodController.foodDetailDelete);
router.get('/:id/like', foodController.foodDetailLike);
router.delete('/:id/like', foodController.foodDetailDislike);
router.post('/:id/review', foodController.foodDetailComment);

module.exports = [
  router
]
