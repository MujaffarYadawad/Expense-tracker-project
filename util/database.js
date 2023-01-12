const Sequelize = require('sequelize');


 

const sequelize = new Sequelize('expense-tracker-project','root','Mujaffar123',{
    dialect:'mysql',
    host:'localhost'

});


module.exports = sequelize;