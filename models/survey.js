const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  username: {
    type: String,
    ref: 'User',
    required: true,
  },
  weight_management: { type: String, required: true },
  tastes: [{ type: String }], // Sử dụng mảng để lưu trữ nhiều giá trị
  dish_types: [{ type: String }] // Sử dụng mảng để lưu trữ nhiều giá trị
});

module.exports = mongoose.model('Survey', surveySchema);
