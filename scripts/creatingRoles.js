
const { Sequelize, DataTypes} = require('sequelize')
const User = require('../models/User')
const Role = require('../models/Roles')
const sequelize = require('../config/sequelize')
const uuid = require('uuid')
const createRole = async(name) =>
{
  const roleId = uuid.v4()
  const role = Role.build(
    {
      name: name,
      id: roleId
      
    } 
  )

  await role.save()
  return role.id
}

module.exports = createRole
