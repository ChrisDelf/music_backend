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
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    }
  })

module.exports = Role
