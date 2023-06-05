const express = require('express')

const router = express.Router()

const verifyToken = require('../middleware/auth')

const UserController = require('../controllers/userController')

router.post('/register', UserController.resgiter)
router.post('/login', UserController.login)
router.get('/profile', verifyToken, UserController.profile)
router.put('/update-profile', verifyToken, UserController.updateProfile)

module.exports = router