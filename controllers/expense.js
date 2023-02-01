const Expense = require("../models/expense");
const UserServices =  require('../services/userservices');
const S3Service = require ('../services/S3services');
const downloadfiles = require("../models/downloadFiles");
  


exports.downloadExpense = async (req, res, next) => {
  try {

      const expenses = await  UserServices.getExpenses(req)  //req.user.getExpenses();
     // console.log("expensees -->", expenses);
      const stringifiedExpensese = JSON.stringify(expenses);

      // it should be open upen userId
      const userId = req.user.id;
      const filename = `Expenses${userId}/${new Date()}.txt`;
      const fileURL = await S3Service.uploadToS3(stringifiedExpensese, filename);
      console.log("fileURL --> ", fileURL);
      const previouseFiles = await downloadfiles.create({URL:fileURL , userId: req.user.id}) // storing the links in table

      res.status(200).json({ fileURL, success: true });

  }
   catch (err) {
    console.log(err)
    res.status(500).json({fileURL: '', success: false, error: err})
  }

  
};

exports.getAllExpense = async (req, res, next) => {
  try {
       

       
        let page = +req.query.page || 1;
        let ITEMS_Per_Page = +req.query.expPerPage  || 3;
 
       var totalItems = await req.user.countExpenses();
        
       var val = await req.user.getExpenses({
        offset: (page - 1) * ITEMS_Per_Page,
          limit: ITEMS_Per_Page
       });
   
       const downloadedFiles =  await downloadfiles.findAll({where : { userId: req.user.id}})  //geting the links stored in tabel
 
    
      res.json({
      val: val,
      isPremium: req.user.ispremiumuser,
      currentPage: page,
      hasNextPage: totalItems > page * ITEMS_Per_Page,
      nextPage: page + 1,
      hasPreviousPage: page > 1,
      previousPage: +page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_Per_Page),
      downloadedFilesData : downloadedFiles
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
