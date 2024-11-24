const foodService = require("../services/food.service");
const Food = require("../models/food");
const axios = require("axios");
const dotenv = require('dotenv')
dotenv.config();
const KOKUSHIMUSOU_SERVER = "http://localhost:"+process.env.PORT;

exports.foodsPage = async (req, res) => {
    // TODO: Render Food List

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
        // Respond with a success message
        res.status(201).json({ message: 'Food item created successfully!', foodItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating food item.' });
    }
};

exports.foodDetailPage = async (req, res) => {
    // Not implemented
}
