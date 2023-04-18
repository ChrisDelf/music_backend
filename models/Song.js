const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../config/sequelize')


const Song = sequelize.define('song',
  {
    name:
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    fileName:
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    genre:
    {
      type: DataTypes.STRING,
      allowNull: true
    },
    artist:
    {
      type: DataTypes.STRING,
      allowNull: true
    },
    originalLink:
    {
    type: DataTypes.STRING,
      allowNull: false
    }

  })

module.exports = Song

