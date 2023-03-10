const Role = require('../models/Roles');
const uuid = require('uuid');


const testRoles = (allowedRoles) =>
{
  var first = function(){
    return new Promise(function(resolve){
      console.log("First")
      resolve()
    })
  }

  var second = function(){
    return new Promise(function(resolve){
      console.log("second")
      resolve()
    })
  }

  first().then(second)
}

module.exports = testRoles

