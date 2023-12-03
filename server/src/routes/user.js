const express = require('express')
const userController = require('../app/controllers/userController')
const requireAuth = require('../middleware/requireAuth')
const { route } = require('./page')
const router = express.Router()

// login route
router.post('/login', userController.loginUser)
// add user route
router.post('/adduser', userController.addUser)
 
// change password
router.post('/changepass', userController.change_password)

// update user role route
router.post('/updaterole', userController.update_user_role)
// demote user role route
router.post('/demoteuser', userController.demote_user_role)

// router.use(requireAuth.AuthAdmin) // cho những phần cần admin đăng nhập
// router.use(requireAuth.AuthUser) // cho những phần cần user đăng nhập

module.exports = router