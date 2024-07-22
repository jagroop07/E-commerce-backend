const express = require('express')
const { createOrder, fetchAllOrders, updateOrder, fetchOrderById } = require('../controllers/orders')
const router = express.Router()

router
    .post('/', createOrder)
    .get('/', fetchAllOrders)
    .patch('/:id', updateOrder)
    .get('/fetch', fetchOrderById)

module.exports = router