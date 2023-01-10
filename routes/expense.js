const express = require('express')
const userAuthentication = require('../middleware/auth');

const expneseController =require('../controllers/expense');
 
const router=express.Router();

router.post('/postExpenses', userAuthentication.authenticate, expneseController.postExpense);
router.get('/getExpenses', userAuthentication.authenticate, expneseController.getExpense);
router.delete('/deleteExpenses/:id', userAuthentication.authenticate, expneseController.deleteExpense);

module.exports = router;