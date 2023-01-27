const Role = require('../models/Roles');
const uuid = require('uuid');

const verifyRoles = (allowedRoles) => {
  return (req, res, next) => {

    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = allowedRoles;
    let reqRoles = []
    new Promise(function(res, error) {
      req.roles.forEach((role) => {
        let temp_role =  Role.findOne(
          {
            where:
            {
              id: uuid.v4(role)
            }
          })
        console.log("role", temp_role)
        reqRoles.push(role)

      })
     
    })
      .then((res) => {
        console.log("req",reqRoles)
        console.log("rolesArray", rolesArray)
        const result = req.roles.map(role => rolesArray.includes(role).find(val => val === true));
        if (result == null) return res.sendStatus(401)
      })
      .catch((error) =>{
        console.log("Failed")
        
      })
    /* if (!result) return res.sendStatus(401) */
    next();
  }
}

module.exports = verifyRoles
