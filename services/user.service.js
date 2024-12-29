const Survey = require('../models/survey');
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.registerUser = async(email, username, password, confirm_password) => {
    // Check if passwords match
    if (password !== confirm_password) {
        throw new Error("Passwords do not match");
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
        email,
        username,
        password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    return newUser;
};

exports.authenticateUser = async (username, password) => {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error("User not found");
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid password");
    }

    return user;
};

exports.getUserByEmail = async (email) => {
    try {
        const user = await User.find({ where: { email: email } });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error('Error fetching user item by email: ' + error.message);
    }
};

exports.getUserById = async (userId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid user ID format');
        }

        const user = await User.findById(userId);
        
        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        throw error;
    }
};

exports.getSurveyByUsername = async (username) => {
    try {
        const survey = await Survey.findOne({ username });
        return survey;
    } catch (error) {
        throw error;
    }
}

exports.saveSurvey = async (survey) => {
  try {
    const { username, weight_management, tastes, dish_types } = survey; 

    if (!weight_management || !Array.isArray(tastes) || !Array.isArray(dish_types)) {
      return null; // Or throw an error 
    }

    const existingSurvey = await Survey.findOne({ username });

    if (existingSurvey) {
      // Update existing survey
      existingSurvey.weight_management = weight_management;
      existingSurvey.tastes = tastes;
      existingSurvey.dish_types = dish_types;
      await existingSurvey.save();
      return existingSurvey; 
    } else {
      // Create new survey
      const newSurvey = new Survey({ 
        username,
        weight_management,
        tastes,
        dish_types,
      });
      await newSurvey.save();
      return newSurvey;
    }

  } catch (error) {
    console.error('Error saving survey:', error);
    return null; // Or throw an error
  }
};
