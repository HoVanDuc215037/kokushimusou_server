const dishesServices = require("../services/dishesService");
const axios = require("axios");
const dotenv = require('dotenv')
dotenv.config();
const KOKUSHIMUSOU_SERVER = "http://localhost:" + process.env.PORT;

exports.index = async (req, res) => {
  let dishes = dishesServices.processGetDishes();
  dishes = (await dishes).dishes;
  dishes = dishes;
  //console.log(dishes);
  res.render('list_dishes', { dishes });
}