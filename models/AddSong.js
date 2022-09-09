
const { Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../config/sequelize')

// join table for playist and albums
const addSong = sequelize.define('addSong',
 {
   songlistid: DataTypes.INTEGER,
   songid: DataTypes.INTEGER
 })

module.exports = addSong
