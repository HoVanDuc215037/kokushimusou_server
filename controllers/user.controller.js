const userService = require('../services/user.service');

exports.saveSurveyData = async (req, res) => {
  const data = { userId: req.body.userId, postId: req.body.postId }
  try {
    const survey = await userService.saveSurveyData(data);
    if (survey) res.send({ result: true, message: "Saving survey's data done!", data: survey });
    else {
      res.send({ result: false, message: "Unknown error" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const user = await userService.getUser();
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching favorite user',
      error: error.message
    });
  }
}

exports.processUserLikePost = async (req, res) => {
  const data = { userId: req.body.userId, postId: req.body.postId }
  try {
    const favorites = await userService.processUserLikePost(data);
    res.status(200).json({
      success: true,
      data: favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error process favorite',
      error: error.message
    });
  }
}

exports.getAllFavoritePostOfUser = async (req, res) => {
  const userId = req.body.userId;
  try {
    const favorites = await userService.getFavoritePostOfAnUser(userId);
    res.status(200).json({
      success: true,
      data: favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching favorites',
      error: error.message
    });
  }
}