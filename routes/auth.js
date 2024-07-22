const express = require('express')
const { userSignUp, userLogin } = require('../controllers/auth')
const router = express.Router()

router
    .post('/signup', userSignUp)
    .post('/login', userLogin)

module.exports = router