const foodService = require("../services/food.service");
const Food = require("../models/food");
const axios = require("axios");
const dotenv = require('dotenv')
dotenv.config();
const KOKUSHIMUSOU_SERVER = "http://localhost:"+process.env.PORT;

exports.foodsPage = async (req, res) => {
    const foods = await foodService.getApprovedFoods();
    res.render('list_food', { foods });
}

exports.favoritesPage = async (req, res) => {
    const username = req.session.username;
    if (!username) res.redirect('/login');
    else {
        const foods = await foodService.getMyFavoriteFoods(username);
        res.render('favorite_food', { foods });
    }
}

exports.createFoodPage = async (req, res) => {
    const username = req.session.username;
    if (!username) res.redirect('/login');
    else { 
        const my_foods = await foodService.getMyCreatedFoods(username);
        res.render('create_food', { my_foods });
    }
}

exports.createFoodRequest = async (req, res) => {
    const { username, name, description, ingredients,
            recipe, locations, image_base64,
            weight_management, taste, dish_type } = req.body;
    // Create the food object
    const foodData = {
        username: username, // Temporarily set
        name,
        description,
        ingredients: ingredients || null,
        recipe: recipe || null,
        locations: locations || null,
        image: image_base64 || null, // Store the base64 image
        weight_management,
        tastes: taste,
        dish_types: dish_type,
    };

    try {
        const foodItem = await foodService.createFood(foodData);
        req.flash('success_msg', 'Food item created successfully!');
        res.redirect('/food/create');
    } catch (error) {
        req.flash('error_msg', 'Error creating food item.');
        res.redirect('/food/create');
    }
};

exports.foodDetailPage = async (req, res) => {
    const food = await foodService.getFoodById(req.params.id);
    res.render('view_food', { food });
}

exports.foodDetailComment = async (req, res) => {
  try {
    const { rating, username, content, date } = req.body;
    const foodId = req.params.id;

    // Fetch the food document
    const food = await foodService.getFoodById(foodId);
    if (!food) {
      return res.status(404).json({ message: 'Food not found.' });
    }

    // Create a new comment object
    const newComment = {
      username,
      content,
      rating,
      date,
    };

    // Update the food document with the new comment (assuming 'comments' is an array)
    food.comments.push(newComment);
    await foodService.updateFood(foodId, food); // Update the food document in the database

    res.status(201).json({ message: 'Comment added successfully.' });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.foodDetailLike = async (req, res) => {
    try {
        const username = req.session.username;
        const foodId = req.params.id;

        const food = await foodService.getFoodById(foodId);
        if (!food) {
          return res.status(404).json({ message: 'Food not found.' });
        }
        if (!food.likes.includes(username)) {
            food.likes.push(username);
            await foodService.updateFood(foodId, food); // Update the food document in the database
        }
        res.status(201).json({ message: 'Like added successfully.' });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

exports.foodDetailDislike = async (req, res) => {
  try {
    const username = req.session.username;
    const foodId = req.params.id;

    const food = await foodService.getFoodById(foodId);
    if (!food) {
      return res.status(404).json({ message: 'Food not found.' });
    }

    // Dislike logic: remove username from likes array if it exists
    const foodIndex = food.likes.indexOf(username);
    if (foodIndex !== -1) {
      food.likes.splice(foodIndex, 1);
      await foodService.updateFood(foodId, food); // Update the food document in the database
    }

    res.status(200).json({ message: 'Dislike processed successfully.' });
  } catch (error) {
    console.error('Error removing like:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.foodDetailDelete = async (req, res) => {
  try {
    const food = await foodService.getFoodById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    await foodService.deleteFoodById(req.params.id);
    return res.status(200).json({ message: 'Food deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting food' });
  }
};
