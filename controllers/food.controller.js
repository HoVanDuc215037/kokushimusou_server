const foodService = require("../services/food.service");
const Food = require("../models/food");
const axios = require("axios");
const dotenv = require('dotenv')
dotenv.config();
const KOKUSHIMUSOU_SERVER = "http://localhost:"+process.env.PORT;

exports.foodsPage = async (req, res) => {
    // TODO: Render Food List
    const foods = await foodService.getFoods();
    res.render('list_food', { username: "hello", foods });
}

exports.anketPage = async (req, res) => {
    // TODO
}

exports.anketRequest = async (req, res) => {
    // TODO
}

exports.createFoodPage = async (req, res) => {
    const username = req.user ? req.user.username : 'test';
    res.render('create_food', { username });
}

exports.createFoodRequest = async (req, res) => {
    const { username, name, description, ingredients, recipe, locations, image_base64 } = req.body;
    // Create the food object
    const foodData = {
        username: username || "test", // Temporarily set
        name,
        description,
        ingredients: ingredients || null,
        recipe: recipe || null,
        locations: locations || null,
        image: image_base64 || null, // Store the base64 image
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
    // Not implemented
    const food = await foodService.getFoodById(req.params.id);
    // res.render('show_food', { username, food });
}
