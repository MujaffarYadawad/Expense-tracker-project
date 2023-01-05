const express = require ('express')

const signupController = require('../controllers/signup')

const router = express.Router()

router.post('/postSignupUser', signupController.postSignupUser)

module.exports = router