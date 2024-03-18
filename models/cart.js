const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the Item schema
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    itemName: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
});

const User = mongoose.model('Cart', cartSchema);
module.exports = User;