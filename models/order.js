const mongoose = require('mongoose');

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

const User = mongoose.model('Order', orderSchema);
module.exports = User;