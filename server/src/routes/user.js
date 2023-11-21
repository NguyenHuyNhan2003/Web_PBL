const express = require('express')
const userController = require('../app/controllers/userController')

const router = express.Router()

// login route
router.post('/login', userController.loginUser)
// add user route
router.post('/adduser', userController.addUser)

module.exports = router