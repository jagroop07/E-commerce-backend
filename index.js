const express = require('express')
const dotenv = require('dotenv')
const Order = require('./models/orders')
const connectDb = require('./database/db')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const stripe = require('stripe')
const path = require('path')
dotenv.config()
require('./config/passport')(passport)
const app = express()

//routers
const productRouter = require('./routes/product')
const brandRouter = require('./routes/brands')
const categoryRouter = require('./routes/categories')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/orders')
const stripeRouter = require('./routes/stripePayment')

//webhook
const endpointSecret = process.env.END_POINT_SECRET

app.post('/webhook', express.raw({ type: 'application/json' }), async(request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            const order = await Order.findById(paymentIntentSucceeded.metadata.order_id)
            order.paymentStatus('recieved')
            await order.save()
            
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    response.send();
})

//midllewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'build')))
app.use(passport.initialize())
app.use('/products', passport.authenticate('jwt', { session: false }), productRouter)
app.use('/brands', brandRouter)
app.use('/categories', categoryRouter)
app.use('/auth', authRouter)
app.use('/users', passport.authenticate('jwt', { session: false }), userRouter)
app.use('/cart', passport.authenticate('jwt', { session: false }), cartRouter)
app.use('/order', passport.authenticate('jwt', { session: false }), orderRouter)
app.use('/create-payment-intent', passport.authenticate('jwt', { session: false }), stripeRouter)

//in case of routes doesnt match it will check in this file
app.get('*', (req, res) =>
    res.sendFile(path.resolve('build', 'index.html'))
);

//database
connectDb()

//server
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`)
})

