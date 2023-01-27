const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      console.log(decoded)
      if (err) return res.sendStatus(403); // The token is invalid
      req.user = decoded.UserInfo.username
      req.roles = decoded.UserInfo.roles
      console.log(req.roles)
      // if you forgot the .next its going to loop for ever
      next();
    }
  )
}

module.exports = verifyJWT
