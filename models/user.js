const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the Person schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['normal', 'admin'],
        default: 'normal'
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;