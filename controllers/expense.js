const Expense = require("../models/expense");
const UserServices =  require('../services/userservices');
const S3Service = require ('../services/S3services');

  


exports.downloadExpense = async (req, res, next) => {
  try {

      const expenses = await  UserServices.getExpenses(req)  //req.user.getExpenses();
     // console.log("expensees -->", expenses);
      const stringifiedExpensese = JSON.stringify(expenses);

      // it should be open upen userId
      const userId = req.user.id;
      const filename = `Expenses${userId}/${new Date()}.txt`;
      const fileURL = await S3Service.uploadToS3(stringifiedExpensese, filename);
    //  console.log("fileURL --> ", fileURL);
      res.status(200).json({ fileURL, success: true });

  }
   catch (err) {
    console.log(err)
    res.status(500).json({fileURL: '', success: false, error: err})
  }

  
};

exports.getAllExpense = async (req, res, next) => {
  try {
       

       
        var page = +req.query.page || 1;
        let ITEMS_Per_Page = +req.query.expPerPage  ;
              // console.log("exp per page-->", ITEMS_Per_Page);
   // console.log(req.user.id, ' users id')
    
    const data = await Expense.findAll({ where: { userId: req.user.id } });

   // console.log(data,' data ');

   // res.json({ val: data, isPremium: req.user.ispremiumuser });
    var totalItems = await req.user.countExpenses();
    // console.log('val-->', val)
        
   var val = await req.user.getExpenses({
     offset: (page - 1) * ITEMS_Per_Page,
     limit: ITEMS_Per_Page
   });

      // console.log('val -->', val)
      // console.log('totalItems-->', totalItems)
      // console.log("next page-->", totalItems > page * ITEMS_Per_Page);
    
    res.json({
      val: val,
      isPremium: req.user.ispremiumuser,
      currentPage: page,
      hasNextPage:   totalItems > page * ITEMS_Per_Page  ,
      nextPage: page + 1,
      hasPreviousPage: page > 1,
      previousPage: +page - 1,
     // lastPage: Math.ceil(totalItems / ITEMS_Per_Page),
    });

  } catch (err) {
    console.log(err);
  }
};

exports.postExpense = async (req, res, next) => {
  try {
    const expenseAmount = req.body.expenseAmount;
    const expenseDescription = req.body.expenseDescription;
    const category = req.body.category;

    const data = await req.user.createExpense({
      expenseAmount: expenseAmount,
      expenseDescription: expenseDescription,
      category: category,
    });
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const expId = req.params.id;

    // console.log('expId id',expId)

    const data = await Expense.destroy({ where: { id: expId } });

    res
      .status(200)
      .json({ success: true, message: "exspense is deleted successfully" });
  } catch (err) {
    console.log(err);
  }
};
