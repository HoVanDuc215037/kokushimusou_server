const mongoose = require('mongoose');
//const commentSchema = require('./comment');
//const likeSchema = require('./like');

const likeSchema = new mongoose.Schema({
    username: {
        type: String,
        ref: 'User',
        required: true,
    }
}, { timestamps: true });

const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const foodSchema = new mongoose.Schema({
    username: {
        type: String,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    ingredients: {
        type: String,
        default: null,
    },
    recipe: {
        type: String,
        default: null,
    },
    locations: {
        type: String,
        default: null,
    },
    image: {
        type: String, // This will hold the base64 encoded image
        default: null,
    },
    weight_management: { type: String, required: true },
    tastes: [{ type: String }],
    dish_types: [{ type: String }],
    comments: [commentSchema],
    likes: [{ type: String }],
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;
