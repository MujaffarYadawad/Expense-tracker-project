const Expense = require("../models/expense");

exports.getExpenses = (req, where) => {
  return req.user.getExpenses(where);
}
