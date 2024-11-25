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
  // Not implemented
}

exports.registerRequest = async (req, res) => {
  // Not implemented
}

exports.loginPage = async (req, res) => {
  // Not implemented
}

exports.loginRequest = async (req, res) => {
  // Not implemented
}

exports.logout = async (req, res) => {
  // Not implemented
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
