const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    username: {
        type: String,
        ref: 'User',
        required: true,
    },
    foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true,
    }
}, { timestamps: true });

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
