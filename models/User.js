const { Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../config/sequelize')


const User = sequelize.define('user',
  {
    username:
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    resfreshToken:
    {
      type: DataTypes.STRING
    }

  })

module.exports = User
