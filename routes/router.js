const express = require("express");
const router = express.Router();

//khai báo router con trước, trong router con gọi controller
const homeRouter = require("./home.route");
const foodRouter = require("./food.route");
const userRouter = require("./user.route");
const postRouter = require("./post.route");

//=========================== Main router================================
router.use("/", homeRouter);
router.use("/food", foodRouter);
router.use("/user", userRouter);
router.use("/post", postRouter);

module.exports = router;
