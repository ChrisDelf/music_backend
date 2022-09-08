const User = require('../models/User')

const getAllUsers = async (req, res) =>
{
  const Users = await User.findAll()

  res.status(201).json({'success': Users})
}

const deleteUser = async (req, res) =>
{
 // checking for a complete user
  if (!req?.body?.id) return res.status(400).json({'message': `User ID ${req.body.id} not found`})
  // now we need to grab the user from the database
  const user = await User.destroy({
    where:{
      id: 1,
    }
  })
  res.status(200).json(user)
}

module.exports = {getAllUsers, deleteUser}
