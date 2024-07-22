const express = require('express')
const { fetchBrands, createBrands } = require('../controllers/brands')
const router = express.Router()

router
    .get('/', fetchBrands)
    .post('/', createBrands)

module.exports = router
