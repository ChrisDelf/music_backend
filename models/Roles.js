const { Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../config/sequelize')
const Role = sequelize.define('role',
  {
    name:
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    id:
    {
      type: Sequelize.UUID,
      defaultValue: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    }
  })

module.exports = Role
