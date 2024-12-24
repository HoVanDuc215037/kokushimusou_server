const postService = require('../services/post.service');

exports.getAllPost = async (req, res) => {
  try {
    const post = await postService.getPost();
    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching favorite post',
      error: error.message
    });
  }
}

exports.createPost = async (req, res) => {
  let data = {
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    suggestedPlaces: req.body.suggestedPlaces,
    imageUrl: req.body.imageUrl,
    status: req.body.status,
  }
  try {
    const response = await postService.createPost(data);
    res.status(200).json({
      success: true,
      data: response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error create post',
      error: error.message
    });
  }
}