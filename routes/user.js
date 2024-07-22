const express = require('express')
const { fetchLoggedInUser, updateUser, isAuthUser } = require('../controllers/user')
const router = express.Router()

router
    .get('/', fetchLoggedInUser)
    .patch('/update', updateUser)
    .get('/check', isAuthUser)

module.exports = router