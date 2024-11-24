const express = require("express");
const homeController = require("../controllers/home.controller");

const router = express.Router();

router.get('/', homeController.index); // homepage

router.get('/register', homeController.registerPage);
router.post('/register', homeController.registerRequest);

router.get('/login', homeController.loginPage);
router.post('/login', homeController.loginRequest);

router.get('/logout', homeController.logout); // destroy session

module.exports = [
  router
]
