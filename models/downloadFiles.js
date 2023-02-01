const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const downloadfiles = sequelize.define('downloadedFiles',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    URL:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = downloadfiles