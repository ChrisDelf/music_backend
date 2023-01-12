const User = require('../models/User')

// We want to delete the accessToken to end the session
const handleLogoutToken = async (req, res) => {
  const cookies = req.cookies
  console.log(cookies)
  if (!cookies?.jwt) return res.sendStatus(204)// No content
  
  const refreshToken = cookies.jwt

  const foundUser = await User.findOne(
    {
      refreshToken: refreshToken
    }
  )
  if (!foundUser) {
    res.clearCookie('jwt', { http: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
    return res.sendStatus(204);//no content
  }
  // we need to delete the refreshToken in the db

  foundUser.refreshToken = ""

  await foundUser.save()

  //now we clear the cookies

  res.clearCookie('jwt', { http: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
  res.sendStatus(204)
}

module.exports = { handleLogoutToken}
