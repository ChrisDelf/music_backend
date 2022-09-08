const bcrypt = require('bcrypt');
const User = require('../models/User')


const registerNewUser = async (req, res) =>
{ 
  // deconstructing the res
  const {username, password} = req.body
  // checking to see if the !username and password exist
  if(!username || !password) return res.status(400).json('message', 'Username and password are required.')
  

  newUser = User.build(
    {
      username: username,
      password: password,
      })
  
  await newUser.save();
  res.status(201).json({'success': newUser})
}


module.exports = {registerNewUser}
