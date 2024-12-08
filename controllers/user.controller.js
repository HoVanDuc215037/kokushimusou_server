const userService = require('../services/user.service');

exports.saveSurveyData = async (req, res) => {
  const data = req.body;
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