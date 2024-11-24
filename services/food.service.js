const Food = require('../models/food');

// Method to get all food items
exports.getFoods = async () => {
    try {
        const foods = await Food.find(); // Fetch all food items
        return foods;
    } catch (error) {
        throw new Error('Error fetching food items: ' + error.message);
    }
};

// Method to get approved food items
exports.getApprovedFoods = async () => {
    try {
        const approvedFoods = await Food.find({ approved: true }); // Fetch only approved food items
        return approvedFoods;
    } catch (error) {
        throw new Error('Error fetching approved food items: ' + error.message);
    }
};

// Method to create new food item
exports.createFood = async (foodData) => {
    const foodItem = new Food(foodData);
    try {
        await foodItem.save();
        return foodItem;
    } catch (error) {
        throw new Error('Error creating food item: ' + error.message);
    }
};
