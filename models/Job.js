const { Sequelize, DataTypes, Model} = require('sequelize')
const sequelize = require('../config/sequelize')


const Job = sequelize.define('job', 
{
    jobId: DataTypes.INTEGER,
    songName: DataTypes.STRING,
    isLoading: DataTypes.BOOLEAN,
})

module.exports = Job;
