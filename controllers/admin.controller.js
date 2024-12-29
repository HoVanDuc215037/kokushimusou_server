const Food = require('../models/food');
const foodService = require('../services/food.service');

exports.foodPage = async (req, res) => {
  try {
    const food = await foodService.getFoods();
    res.render('list_food_admin', { food });
  } catch (error) {
    res.status(500).send("An error occurred while fetching food.");
  }
};

exports.viewFood = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const food = await foodService.getFoodById(id);
    if (!food) {
      return res.status(404).send("Food not found.");
    }
    res.render('view_food', { food });
  } catch (error) {
    res.status(500).send("An error occurred while fetching the food.");
  }
};

exports.deleteFood = async (req, res) => {
  const { id } = req.params;
  try {
    await Food.findByIdAndDelete(id);
    res.redirect('/admin/food');
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while deleting the food.");
  }
};