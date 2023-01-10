 
const Expense = require('../models/expense');

exports.getExpense = (async(req,res,next) =>{
   try{
    const data = await Expense.findAll({where : { userId : req.user.id}});
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
   

  const data = await req.user.createExpense({
    expenseAmount : expenseAmount,
    expenseDescription : expenseDescription,
    category : category,
  
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

   // console.log('expId id',expId)

    
     const data = await Expense.destroy({ where: { id: expId}}); 
     
    res.status(200).json({ success: true, message: "exspense is deleted successfully" });  
 
    
     
    
    } 
     catch(err){
        console.log(err);
     }
})