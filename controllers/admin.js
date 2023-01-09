 
const Expense = require('../models/expense');

exports.getExpense = (async(req,res,next) =>{
   try{
    const data = await Expense.findAll();
    res.json(data);
   }
   catch(err){
    console.log(err)
   }
});

exports.postExpense = (async(req,res,next) => {
 try{
  const expenseAmount = req.body.expenseAmount;
  const expenseDescription = req.body.expenseDescription;
  const category = req.body.category;

  const data = await Expense.create({
    expenseAmount : expenseAmount,
    expenseDescription : expenseDescription,
    category : category
  })
  res.json(data);
} 
  catch(err){
    console.log(err);
  }

})

exports.deleteExpense = ( async (req,res,next) => {
  try {
    const expId = req.params.id
    const data = await Expense.destroy({ where: {id: expId}});    // res.destroy();   is direct item in try carch 
      res.sendStatus(200);   
     
    
    } 
     catch(err){
        console.log(err);
     }
})