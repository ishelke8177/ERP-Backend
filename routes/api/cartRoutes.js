const express = require('express');
const router = express.Router();
const Cart = require('../../models/cart');
const User = require('../../models/user');
const { jwtAuthMiddleware } = require('../../jwt');

// @route    GET api/cart/getCartItems
// @desc     Get cart items for all users
// @access   Private
router.get('/getCartItems', jwtAuthMiddleware, async (req, res) => {
    try{
        const cartItems = await Cart.find()
        res.status(200).json(cartItems)
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// @route    GET api/cart/getUserCart
// @desc     Get cart items for particular user
// @access   Private
router.get('/getUserCart', jwtAuthMiddleware, async (req, res) => {
    try{
        const cartItems = await Cart.find({ user: req.user.id})
        res.status(200).json(cartItems)
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// @route    POST api/cart/addToCart
// @desc     Add to cart
// @access   Private
router.post('/addToCart', jwtAuthMiddleware, async (req, res) => {
    try{
        const user = await User.findById(req.user.id)

        const newItem = new Cart({
            user: user._id,
            itemName: req.body.itemName,
            imageURL: req.body.imageURL,
            pricePerItem: req.body.pricePerItem,
            totalPrice: req.body.totalPrice,
            quantity: req.body.quantity,
            category: req.body.category
        })

        const result = await Cart.findOne({ itemName: req.body.itemName })
        if(!result){
            const resp = await newItem.save();
            return res.status(200).json(resp)
        }

        const filter = { itemName: req.body.itemName };
        const updateDoc = {
            $set: {
                totalPrice: result.totalPrice + req.body.totalPrice,
                quantity: result.quantity + req.body.quantity
            },
        };

        const response = await Cart.updateOne(filter, updateDoc);
        res.status(200).json(response)
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// @route    DELETE api/cart/removeCartItem/:itemId
// @desc     Remove from cart
// @access   Private
router.delete('/removeCartItem/:itemId', jwtAuthMiddleware, async (req, res) => {
    try{
        const itemId = req.params.itemId
        const response = await Cart.findByIdAndDelete(itemId);

        if (!response) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.status(200).json(response)
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;