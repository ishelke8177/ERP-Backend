const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const { generateToken, jwtAuthMiddleware } = require('../../jwt');

// @route    POST api/user/signup
// @desc     route to register a user
// @access   Private
router.post('/signup', async (req, res) =>{
    try{
        const data = req.body // Assuming the request body contains the User data

        // Check if there is already an admin user
        const adminUser = await User.findOne({ role: 'admin' });
        if (data.role === 'admin' && adminUser) {
            return res.status(400).json({ error: 'Admin user already exists' });
        }

        // Check if a user with the same Email already exists
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with the same Email already exists' });
        }

        // Create a new User document using the Mongoose model
        const newUser = new User(data);

        // Save the new user to the database
        const response = await newUser.save();
        console.log('user saved');

        const payload = {
            id: response.id
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);

        res.status(200).json({ response: response, token: token });
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


// @route    GET api/user/getAllUsers
// @desc     Get total users 
// @access   Private
router.get('/getAllUsers', jwtAuthMiddleware, async (req, res) => {
    try{
        const allUsers = await User.find();
        return res.status(200).json({ count: allUsers.length });
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;