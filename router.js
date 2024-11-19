const express = require("express");
const router = express.Router();

//khai báo controller trước
const XampleController = require("./controllers/XampleController");

//=========================== Main router================================
router.get("/", XampleController.index);
//router.post("/create", XampleController.getXampleCreate);
router.get("/get", XampleController.getXampleGet);

module.exports = [
  router
]