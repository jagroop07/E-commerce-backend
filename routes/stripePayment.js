const express = require('express')
const {createPaymentIntent} = require('../config/stripePayment')
const router = express.Router()

router
    .post('/', createPaymentIntent)

module.exports= router