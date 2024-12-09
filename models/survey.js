const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  weight_management: { type: String, required: true },
  taste: { type: String, required: true },
  dish_type: { type: String, required: true },
});

module.exports = mongoose.model('Survey', surveySchema);
