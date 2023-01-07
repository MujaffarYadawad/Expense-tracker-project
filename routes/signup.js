const express = require ('express')

const signupController = require('../controllers/signup')

const router = express.Router()

router.post('/postSignupUser', signupController.postSignupUser);
router.post("/postLoginUser", signupController.postLoginsUser);


module.exports = router