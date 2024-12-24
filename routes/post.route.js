const express = require("express");
const router = express.Router();

const postController = require("../controllers/post.controller");

router.get('/get-all-post', postController.getAllPost);
router.post('/create', postController.createPost);

module.exports = [
  router
]