const express = require('express')
const { createProduct, fetchFilterProducts, fetchProductbyId, updateProduct, deleteProduct } = require('../controllers/product')
const router = express.Router()

router
    .post('/', createProduct)
    .get('/', fetchFilterProducts)
    .get('/:id', fetchProductbyId)
    .patch('/:id', updateProduct)
    .delete('/:id', deleteProduct)

module.exports = router