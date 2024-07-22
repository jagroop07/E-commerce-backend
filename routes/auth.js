const express = require('express')
const { userSignUp, userLogin, logOut } = require('../controllers/auth')
const router = express.Router()

router
    .post('/signup', userSignUp)
    .post('/login', userLogin)
    .get('/logout', logOut)

module.exports = router