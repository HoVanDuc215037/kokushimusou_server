const userService = require("../services/user.service");
const foodService = require("../services/food.service");
const Survey = require("../models/survey");

const axios = require("axios");
const dotenv = require('dotenv')
dotenv.config();
const KOKUSHIMUSOU_SERVER = "http://localhost:"+process.env.PORT;

exports.index = async (req, res) => {
  const foods = await foodService.getApprovedFoods();
  res.render('list_food', { foods });
}

// if already logged in, redirect
exports.registerPage = async (req, res) => {
  const username = req.session.username;
  if (username) res.redirect('/');
  else res.render('register');
}

exports.registerRequest = async (req, res) => {
  const { email, username, password, confirm_password } = req.body;
  try {
    const user = await userService.registerUser(email, username, password, confirm_password);
    if (user) {
      res.redirect('/login'); // Redirect to login
    } else {
      res.render('register', { error: "登録に失敗しました。もう一度お試しください。" });
    }
  } catch (error) {
    console.error(error);
    res.render('register', { error: "登録中にエラーが発生しました。" });
  }
}

// if already logged in, redirect
exports.loginPage = async (req, res) => {
  const username = req.session.username;
  if (username) res.redirect('/');
  else res.render('login');
}

exports.loginRequest = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userService.authenticateUser(username, password);
    if (user) {
      req.session.username = username;
      req.session.role = user.role;
      // Check if user has done survey or not,
      const survey = await userService.getSurveyByUsername(username);
      if (!survey){
        res.redirect('/user/survey');
      }
      else res.redirect('/'); // Redirect to the main page after successful login
    } else {
      res.render('login', { error: "ユーザー名またはパスワードが無効です。" });
    }
  } catch (error) {
    console.error(error);
    res.render('login', { error: "ログイン中にエラーが発生しました。" });
  }
}

exports.logout = async (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.redirect('/');
    }
    res.redirect('/');
  });
}

exports.adminPage = async (req, res) => {
  const role = req.session.role;
  if (role !== "admin") res.redirect('/');
  else {
    const foods = await foodService.getPendingFoods();
    res.render('admin_page', { foods });
  }
}

exports.approve = async (req, res) => {
  try {
    const foodId = req.params.id;

    const food = await foodService.getFoodById(foodId);
    if (!food) {
      return res.status(404).json({ message: 'Food not found.' });
    }

    // Update the food status to "approved"
    food.status = 'approved';
    await foodService.updateFood(foodId, food);

    res.status(200).json({ message: 'Food successfully approved.' });
  } catch (error) {
    console.error('Error approving food:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.reject = async (req, res) => {
  try {
    const foodId = req.params.id;

    // Fetch the food document
    const food = await foodService.getFoodById(foodId);
    if (!food) {
      return res.status(404).json({ message: 'Food not found.' });
    }

    // Update the food status to "rejected"
    food.status = 'rejected';
    await foodService.updateFood(foodId, food);

    res.status(200).json({ message: 'Food successfully rejected.' });
  } catch (error) {
    console.error('Error approving food:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
