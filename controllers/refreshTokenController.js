const User = require('../models/User.js')
const AddRole = require('../models/AddRole')



const jwt = require('jsonwebtoken')
require('dotenv').config();


const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies

  // we are going to check if we have a cookie and then check
  // if the cookies has a jwt property
  if (!cookies?.jwt) return res.sendStatus(401)// 401 is unauthorized

  const refreshToken = cookies.jwt
  //we now want to find the user using the refreshToken
  const foundUser = await User.findOne(
    {
      where:
        { username: req.body.username },
      include: AddRole
    })
  
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.sendStatus(403); //Forbidden
        console.log('attempted refresh token reuse!')
        const hackedUser = await User.findOne({ where: { username: decoded.username }});
        hackedUser.refreshToken = [];
        const result = await hackedUser.save();
        console.log(result);
        return res.sendStatus(401)
      })
  }
  else {
    // now we want to create a refreshToken
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.username !== decoded.UserInfo.username) return res.sendStatus(403);//forbidden
        const temp_roles = decoded.UserInfo.roles
        let roles = []
        temp_roles.forEach(r => {
          roles.push(r)
        })
        const accessToken = jwt.sign(
          {
            "UserInfo": 
            {
              "username": decoded.username,
              "roles": roles
            }
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '300s' }
        )
        res.json({ accessToken })
      }
    )
  }
}

module.exports = { handleRefreshToken };
