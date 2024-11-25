const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    }
  });
  
  module.exports = mongoose.model('Suggestion', suggestionSchema);