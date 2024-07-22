const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
 
const createPaymentIntent = async (req, res) => {
    const { totalAmount, orderId } = req.body;
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        order_id: orderId
      }
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
}

module.exports = {
    createPaymentIntent
}