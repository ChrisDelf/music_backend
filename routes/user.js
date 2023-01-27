const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();
const verifyRoles = require('../middleware/verifyRoles')


router.route('/')
  .get(verifyRoles(["admin"]),userController.getAllUsers)
  .delete(userController.deleteUser)
router.route('/likes/:id')
  .get(userController.getAllLikes)

module.exports = router;
