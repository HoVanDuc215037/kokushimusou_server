const Food = require('../models/food');

// Method to get all food items
exports.getFoods = async () => {
    try {
        const foods = await Food.find();
        return foods;
    } catch (error) {
        throw new Error('Error fetching food items: ' + error.message);
    }
};

exports.getMyCreatedFoods = async (username) => {
    try {
        const foods = await Food.find({ username });
        return foods;
    } catch (error) {
        throw new Error('Error fetching food items: ' + error.message);
    }
};

exports.getMyFavoriteFoods = async (username) => {
    try {
        const foods = await Food.find({ likes: username });
        return foods;
    } catch (error) {
        throw new Error('Error fetching food items: ' + error.message);
    }
};

// Method to get approved food items
exports.getApprovedFoods = async () => {
    try {
        const approvedFoods = await Food.find({ status: 'approved' }); // Fetch only approved food items
        return approvedFoods;
    } catch (error) {
        throw new Error('Error fetching approved food items: ' + error.message);
    }
};

exports.getPendingFoods = async () => {
    try {
        const pendingFoods = await Food.find({ status: 'pending' }); // Fetch only pending food items
        return pendingFoods;
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

exports.updateFood = async (foodId, updatedFoodData) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(
      foodId, 
      { $set: updatedFoodData }, 
      { new: true } // Return the updated document
    );

    if (!updatedFood) {
      throw new Error('Food not found.');
    }

    return updatedFood;
  } catch (error) {
    console.error('Error updating food:', error);
    throw error; // Re-throw the error to be handled by the calling function
  }
};

exports.deleteFoodById = async (foodId) => {
    try {
        const deletedFood = await Food.findByIdAndDelete(foodId);

        if (!deletedFood) {
            throw new Error('Food not found');
        }

        return deletedFood;
    } catch (error) {
        console.error('Error deleting food:', error);
        throw error; 
    }
};

exports.getFoodById = async (foodId) => {
    try {
        const food = await Food.findById(foodId);
        if (!food) {
            throw new Error('Food item not found');
        }
        return food;
    } catch (error) {
        throw new Error('Error fetching food item by ID: ' + error.message);
    }
};
