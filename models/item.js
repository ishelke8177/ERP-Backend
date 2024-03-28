const mongoose = require('mongoose');

// Define the Item schema
const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    image: {
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
        enum: ['South Indian', 'Chinese', 'Maharashtrian', 'Ice Cream'],
        default: 'South Indian',
        required: true
    },
});

const User = mongoose.model('Item', itemSchema);
module.exports = User;