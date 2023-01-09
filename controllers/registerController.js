const bcrypt = require('bcrypt');
const User = require('../models/User')


const registerNewUser = async (req, res) =>
{ 
  // deconstructing the res
  const {username, password} = req.body
  
  // checking to see if the !username and password exist
  if(!username || !password) return res.status(400).json('message', 'Username and password are required.')
  
 try {
   // encrypting the user password
   const hashedPassword = await bcrypt.hash(password, 12)
  newUser = User.build(
    {
      username: username,
      password: hashedPassword,
      })
  
  await newUser.save();
 
  res.status(201).json({'success': newUser}).send()
 }
  catch(err)
  {
    res.status(500).json({'message': err.message}).send()
  }
}


module.exports = {registerNewUser}
