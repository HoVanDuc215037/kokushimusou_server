const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    tastePreferences: {
      type: Map,
      of: String, 
    }
  });
  
  module.exports = mongoose.model('Preference', preferenceSchema);