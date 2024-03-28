const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const { generateToken } = require('../../jwt');

// @route    POST api/auth/login
// @desc     Login route
// @access   Public
router.post('/login', async (req, res) => {
    try{
        // Extract email and password from request body
        const {email, password} = req.body;

        // Check if email or password is missing
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find the user by email
        const user = await User.findOne({email: email});
        console.log(user);
        // If user does not exist or password does not match, return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid Email or Password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
        }
        const token = generateToken(payload);

        // resturn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;