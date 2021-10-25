const express = require('express')
const { registerUser, loginUser, logoutUser, forgetPassword, resetPassword } = require('../Controllers/userControler.js')
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/forget-password').post(forgetPassword)
router.route('/reset-password/:token').put(resetPassword)
router.route('/logout').get(logoutUser)


module.exports = router;