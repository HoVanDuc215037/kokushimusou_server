const Survey = require('../models/survey');

exports.submitSurvey = async (req, res) => {
  try {
    const { weight_management, taste, dish_type } = req.body;

    if (!weight_management || !taste || !dish_type) {
      return res.status(400).json({ message: "全ての項目を入力してください！" });
    }

    const survey = new Survey({
      weight_management,
      taste,
      dish_type,
    });

    await survey.save();
    res.status(200).json({ message: "アンケートを保存しました。" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "エラーが発生しました。" });
  }
};
