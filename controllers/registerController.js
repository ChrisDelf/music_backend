const bcrypt = require('bcrypt');
const User = require('../models/User')
const AddRole = require('../models/AddRole')
const Role = require('../models/Roles')

const registerNewUser = async (req, res) => {
  // deconstructing the res
  const { username, password } = req.body

  // checking to see if the !username and password exist
  if (!username || !password) return res.status(400).json('message', 'Username and password are required.')

  try {
    // encrypting the user password
    const hashedPassword = await bcrypt.hash(password, 12)
    tempUser = User.build(
      {
        username: username,
        password: hashedPassword,
      })

    await tempUser.save();
    const userRole = await Role.findOne(
      {
        where:{
        name: "user"
        }
      })

    const newAddRole = AddRole.build(
      {
        userId: tempUser.id,
        roleId: userRole.id
    }
    )

    await newAddRole.save()
   
    const testUser = await User.findOne(
      {
        where:
      {
       username: tempUser.username
      }
      }
    )
    res.status(201).json(testUser).send()
  }
  catch (err) {
    res.status(500).json({ 'message': err.message }).send()
  }
}


module.exports = { registerNewUser }
