//const userService = require("../services/user.service");
const foodService = require("../services/food.service");
const axios = require("axios");
const dotenv = require('dotenv')
dotenv.config();
const KOKUSHIMUSOU_SERVER = "http://localhost:"+process.env.PORT;

exports.index = async (req, res) => {
  const foods = await foodService.getFoods();
  res.render('list_food', { username: "hello", foods });
}

exports.registerPage = async (req, res) => {
  // Just an example. Not completed yet!
  res.render('register');
}

exports.registerRequest = async (req, res) => {
  // Just an example. Not completed yet!
  const { email, username, password, confirm_password } = req.body;
  try {
    const user = await userService.registerUser(email, username, password, confirm_password);
    if (user) {
      res.redirect('/login'); // Redirect to login
    } else {
      res.render('register', { error: "Registration failed. Please try again." });
    }
  } catch (error) {
    console.error(error);
    res.render('register', { error: "An error occurred during registration." });
  }
}

exports.loginPage = async (req, res) => {
  // Just an example. Not completed yet!
  res.render('login');
}

exports.loginRequest = async (req, res) => {
  // Just an example. Not completed yet!
  const { username, password } = req.body;
  try {
    const user = await userService.authenticateUser(username, password);
    if (user) {
      req.session.username = username; // Store username in session
      req.session.role = user.role; // Store role in session
      res.redirect('/'); // Redirect to the main page after successful login
    } else {
      res.render('login', { error: "Invalid username or password." });
    }
  } catch (error) {
    console.error(error);
    res.render('login', { error: "An error occurred during login." });
  }
}

exports.logout = async (req, res) => {
  // Just an example. Not implemented yet!
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.redirect('/'); // Redirect to main page on error
    }
    res.redirect('/login'); // Redirect to login page after logout
  });
}

exports.getXampleGet = async (req, res) => {
  try {
    //const req_body = req.body;
    const response = await XampleService.processXampleGet();
    res.send({ result: true, hello: response });
  } catch (error) {
    res.send({ error: error.message });
  }
}
