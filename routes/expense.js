const express = require('express')

const expneseController =require('../controllers/admin');
 
const router=express.Router();

router.post('/postExpenses', expneseController.postExpense);
router.get('/getExpenses', expneseController.getExpense);
router.delete('/deleteExpenses/:id', expneseController.deleteExpense);

module.exports = router;