const express = require('express');
const router = express.Router();

// Render giao diện form khảo sát
router.get('/survey', (req, res) => {
  res.render('survey');
});

// Xử lý dữ liệu gửi từ form
const surveyController = require('../controllers/survey.controller');
router.post('/api/survey', surveyController.submitSurvey);

module.exports = router;
