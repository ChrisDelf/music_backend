const { Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../config/sequelize')


const Song = sequelize.define('Song',
  {
    name:
    {
      type: DataTypes.STRING,
      allowNull: false
    }

  })

module.exports = Song

