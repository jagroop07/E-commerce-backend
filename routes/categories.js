const express = require('express')
const { fetchCategory, createCategory } = require('../controllers/categories')
const router = express.Router()

router
    .get('/', fetchCategory)
    .post('/', createCategory)

module.exports = router