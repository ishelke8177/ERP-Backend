const express = require('express');
const router = express.Router();
const Order = require('../../models/order');
const Cart = require('../../models/cart');
const { jwtAuthMiddleware } = require('../../jwt');
const { checkAdminRole } = require('../../utils/helper');

// @route    POST api/order/placeOrder
// @desc     Place order of a particular item
// @access   Private
router.post('/placeOrder', jwtAuthMiddleware, async (req, res) => {
    try{
        const getUserCart = await Cart.find({ user: req.user.id })

        if(getUserCart){
            getUserCart.forEach(async (obj) => {
                const newOrder = new Order({
                    user: req.user.id,
                    itemName: obj.itemName,
                    imageURL: obj.imageURL,
                    pricePerItem: obj.pricePerItem,
                    totalPrice: obj.totalPrice,
                    quantity: obj.quantity,
                    category: obj.category
                })

                await newOrder.save()
            })
        }

        res.status(200).json({message: 'Success'});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// @route    GET api/order
// @desc     Get orders of a particular user
// @access   Private
router.get('/', jwtAuthMiddleware, async (req, res) => {
    try{
        const orders = await Order.find({ user: req.user.id })
        res.status(200).json(orders)
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// @route    GET api/order/getAllOrders
// @desc     Get the count of all the orderes placed till now - for all the users
// @access   Private
router.get('/getAllOrders', jwtAuthMiddleware, async (req, res) => {
    try{
        if(!(await checkAdminRole(req.user.id)))
            return res.status(403).json({message: 'user does not have admin role'});

        const orders = await Order.find()
        res.status(200).json(orders)
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;