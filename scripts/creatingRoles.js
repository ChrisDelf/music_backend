
const { Sequelize, DataTypes} = require('sequelize')
const User = require('../models/User')
const Role = require('../models/Roles')
const sequelize = require('../config/sequelize')

const createRole = async(name) =>
{
  const role = Role.build(
    {
      name: name,
      
    } 
  )

  await role.save()
  return role.id
}

module.exports = createRole
