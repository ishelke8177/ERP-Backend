const express = require('express')
const app = express();
const db = require('./db')

const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/api/userRoutes')
const authRoute = require('./routes/api/authRoute')
const itemRoutes = require('./routes/api/itemRoutes')
const cartRoutes = require('./routes/api/cartRoutes')
const orderRoutes = require('./routes/api/orderRoutes')

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoute)
app.use('/api/item', itemRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)

app.listen(PORT, ()=>{
    console.log('listening on port 3000');
})