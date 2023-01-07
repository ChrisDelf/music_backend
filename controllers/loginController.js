const User = require('../models/User')
const bcrypt = require('bcrypt');


const handleLogin = async (req, res) => {

  const { username, password } = req.body;
  console.log(username, password)
  if (!username || !password) return (res.status(400).json({ 'message': 'Username and password are required' }))

  // next we need to see if we can find the user
  const foundUser = await User.findOne({ username: username })
  if (!foundUser) return (res.status(400).json({ 'message': 'User was not found' }))
  
  // comparing the passwords 
  const match = await bcrypt.compare(password, foundUser.password)
  if (match) {
    res.status(200).json(foundUser)
  }
  else {
    res.status(400).json({ 'message': 'incorrect password' })
  }

}

module.exports = { handleLogin }
