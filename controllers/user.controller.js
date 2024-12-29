const Survey = require('../models/survey');
const userService = require('../services/user.service');
const bcrypt = require('bcrypt');


exports.getSurvey = async (req, res) => {
  const username = req.session.username;
  if (!username) res.redirect('/login');
  else {
    let survey = await userService.getSurveyByUsername(username);
    if (!survey) { 
      // If no survey exists, create a new empty survey object
      survey = { 
        weight_management: null, 
        tastes: [], 
        dish_types: [] 
      }; 
    }
    res.render('survey', { username, survey });
  }
};

exports.submitSurvey = async (req, res) => {
  try {
    const { username, weight_management, tastes, dish_types } = req.body;

    if (!weight_management || !Array.isArray(tastes) || !Array.isArray(dish_types)) {
      return res.status(400).json({ message: "不正なデータ形式です" });
    }

    const survey = new Survey({
      username,
      weight_management,
      tastes,
      dish_types,
    });

    // 保存処理中にエラーが発生した場合、詳細なエラーメッセージを出力
    const result = await userService.saveSurvey(survey);
    res.render('survey', { survey: result, message: "アンケートを保存しました。" });
  } catch (error) {
    console.error('Error saving survey:', error);
    res.status(500).send('Internal Server Error'); // より適切なエラーコードを返す
  }
};

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
