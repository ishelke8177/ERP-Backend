const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the Item schema
const orderSchema = new mongoose.Schema({
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
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
});

const User = mongoose.model('Order', orderSchema);
module.exports = User;