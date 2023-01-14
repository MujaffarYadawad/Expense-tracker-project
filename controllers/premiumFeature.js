const User = require("../models/signup");
const Expense = require("../models/expense");
const sequelize = require("../util/database");

exports.getUserLeaderBoard = async (req, res) => {
  try {
    const leaderboardusers = await User.findAll({
      attributes: ['id', 'name', [sequelize.fn('sum', sequelize.col('expenses.expenseAmount')), 'total_cost']],
      include: [
        {
          model: Expense,
          attributes: []
        }
      ],
      group:  ['user.id']
    });
    const expenses = await Expense.findAll({
      attributes : ['userId', [sequelize.fn('sum', sequelize.col('expenses.expenseAmount')), 'total_cost']],
      group: ['userId'],
      order: [['total_cost', 'DESC']]
    });
    //const userAggregatedExpenses = {}
    //console.log('user-->', users)
    //console.log("expense-->", expenses);
    // expenses.forEach((expense) => {
    //   if (userAggregatedExpenses[expense.userId]) {
    //     userAggregatedExpenses[expense.userId] =
    //       userAggregatedExpenses[expense.userId] + expense.expenseAmount;
    //     // console.log("y1");
    //   } else {
    //     userAggregatedExpenses[expense.userId] = expense.expenseAmount;
    //     //console.log("y");
    //   }
    // })
    
      // var userLeaderBoardDetails = [];
      // users.forEach((user) => {
      //   userLeaderBoardDetails.push({name: user.name, total_cost: userAggregatedExpenses[user.id] || 0})
      // })
      
      // //console.log(userLeaderBoardDetails)
      // userLeaderBoardDetails.sort((a, b) => b.total_cost - a.total_cost)
      // //console.log('user aggregate->>',userAggregatedExpenses)

      res.status(200).json(leaderboardusers);
   
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};



