const express = require('express')
const { addToCart, deleteCart, updateCart, findCartById } = require('../controllers/cart')
const router = express.Router()

router
    .post('/', addToCart)
    .delete('/:id', deleteCart)
    .patch('/:id', updateCart)
    .get('/', findCartById)

module.exports = router