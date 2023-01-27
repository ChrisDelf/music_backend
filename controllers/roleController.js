
const Role = require('../models/Roles')
const bcrypt = require('bcrypt');


const getAllRoles = async (req, res) =>
{
  const Roles = await (Role.findAll())

  res.status(201).json({'success': Roles})
}


module.exports = {getAllRoles}
