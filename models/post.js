const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
    },
    ingredients: {
      type: String,
    },
    instructions: {
      type: String,
    },
    suggestedPlaces: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
    // them tag mon an -> map
  });
  
  module.exports = mongoose.model('Post', postSchema);