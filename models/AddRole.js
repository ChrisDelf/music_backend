
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../config/sequelize')

// join table for user and roll

const addRole = sequelize.define('addRole',
  {
    userId:
    {
      type: DataTypes.INTEGER,
     
    },

    roleId:
    {
      type: Sequelize.UUID,
     
    }

  })

module.exports = addRole
