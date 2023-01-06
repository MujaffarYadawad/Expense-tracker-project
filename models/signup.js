const Sequelize = require('sequelize');
 
const sequelize = require('../util/database')


const Signup = sequelize.define('signupUser', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    umique: true
     
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }

});

module.exports = Signup;
