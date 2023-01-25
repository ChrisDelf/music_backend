const User = require('../models/User')
const bcrypt = require('bcrypt');


const jwt = require('jsonwebtoken')
require('dotenv').config();

const handleLogin = async (req, res) => {

  const { username, password } = req.body;
  if (!username || !password) return (res.status(400).json({ 'message': 'Username and password are required' }))

  // next we need to see if we can find the user
  const foundUser = await User.findOne({where: { username: username }})
  if (!foundUser) return (res.status(400).json({ 'message': 'User was not found' }))

  // comparing the passwords 
  const match = await bcrypt.compare(password, foundUser.password)
  if (match) {

    // if we have match we want to create an access token
    // the accessToken is stored in memory. It is also short lived
    const accessToken = jwt.sign(
      {
        "username": foundUser.username
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '300s' }
    )
    // Creationg of the refreshToken
    // this token if active for a longer period of time
    const refreshToken = jwt.sign(
      {
        "username": foundUser.username
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    )
    // next we need to save the refreshToken with the current user
    // this is going to be stored in our data base
    foundUser.refreshToken = refreshToken
    await foundUser.save();

    // next we will store the refreshToken as a cookie
    // its should be safe since javascript cannot access
    res.cookie('jwt', refreshToken, { http: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    // next we send the accessToken as json
    res.json({ accessToken })
  }
  else {
    if (!match) {
      console.log("PPPOOOPERS")
      res.status(400).json({ 'message': 'incorrect password' })
    }
    res.sendStatus(401)
  }

}

module.exports = { handleLogin }
