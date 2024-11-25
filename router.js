const express = require("express");
const router = express.Router();

//khai báo controller trước
const XampleController = require("./controllers/XampleController");
const dishesController = require("./controllers/dishesController");

//=========================== Main router================================
router.get("/", XampleController.index);
//router.post("/create", XampleController.getXampleCreate);
router.get("/get", XampleController.getXampleGet);


//=========================== Dishes router================================
router.get("/list-dishes", dishesController.index);

module.exports = [
  router
]