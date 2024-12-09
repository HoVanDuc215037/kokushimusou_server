const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  email: {
    type: String,
    ref: 'User',
    required: true,
  },
  data: {
    type: String //xample 1-2-1-4-2-{text}
  }
}, { timestamps: true });

const Survey = mongoose.model('Survey', surveySchema);
module.exports = Survey;