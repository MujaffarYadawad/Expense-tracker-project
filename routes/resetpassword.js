const express = require('express');

const resetPasswordController = require('../controllers/resetpassword');

const router = express.Router();

 
router.use('/forgotpassword', resetPasswordController.forgotPassword);


module.exports = router