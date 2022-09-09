
const { Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../config/sequelize')
const Song = require('./Song')

const SongList = sequelize.define('songList',
  {
    name:
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    listType:
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    isPrivate:
    {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      
    }
  })


module.exports = SongList
