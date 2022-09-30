const { Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../config/sequelize')

const Like = sequelize.define('like',
  {
    userId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER,
    songListId: DataTypes.INTEGER
  })


module.exports = Like
