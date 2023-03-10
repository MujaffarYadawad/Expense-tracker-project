const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Expense = sequelize.define('Expenses', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  expenseAmount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  expenseDescription: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  }

});

module.exports = Expense;