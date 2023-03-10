const Role = require('../models/Roles');
const uuid = require('uuid');
const testRoles = require('./test.js')

const verifyRoles = (allowedRoles) => {
  let result = false
 
  return (req, res, next) => {
    var first = function() {
      return new Promise(function(reslove) {
        
        if (!req?.roles) return res.sendStatus(401);
        req.roles.forEach(async (role) => {
          console.log(result)
          let temp_role = await Role.findOne(
            {
              where:
              {
                id: role
              }
            })

          allowedRoles.forEach((allowed_role) => {
            console.log(allowed_role, temp_role.dataValues.name)

            if (allowed_role == temp_role.dataValues.name) {

              result = true

            }
            else
            {
              result = false
            }
          })
         
          reslove()
        })
      })

    }

    var second = function() {
      return new Promise(function(reslove) {
       

      if (!result)
        {
          return res.sendStatus(401)
        }
        else
        {
        next()
        reslove()
        }
      })
    }

    first().then(second)

  }

}


module.exports = verifyRoles
