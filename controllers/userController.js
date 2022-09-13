const User = require('../models/User')
const Like = require('../models/Like')

const getAllUsers = async (req, res) => {
  const Users = await User.findAll()

  res.status(201).json({ 'success': Users })
}

const deleteUser = async (req, res) => {
  // checking for a complete user
  if (!req?.body?.id) return res.status(400).json({ 'message': `User ID ${req.body.id} not found` })
  // now we need to grab the user from the database
  const user = await User.destroy({
    where: {
      id: req.body.id,
    }
  })
  res.status(200).json(user.likes)
}

const getAllLikes = async (req, res) => {
  // Checking the params
  if (!req?.params?.id) return res.status(400).json({ 'message': 'User ID is required' })

  const user = await User.findOne({
    where: {
      id: req.params.id
    },
    include: Like
  })
  // checking if the user exists

  if (!user) {
    return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
  }

    res.status(200).json(user)
}

  module.exports = { getAllUsers, deleteUser, getAllLikes }
