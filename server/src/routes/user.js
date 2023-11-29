const express = require('express')
const userController = require('../app/controllers/userController')
const requireAuth = require('../middleware/requireAuth')
const { route } = require('./page')
const router = express.Router()

// login route
router.post('/login', userController.loginUser)
// // add user route
// router.post('/adduser', userController.addUser)
// require login
router.use(requireAuth) 
// change password
router.post('/changepass', userController.change_password)

// // require admin login
// router.use(requireAuth.AuthAdmin)
// // update user role route
// router.post('/updaterole', userController.update_user_role)
// // demote user role route
// router.post('/demoteuser', userController.demote_user_role)

module.exports = router