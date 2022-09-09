const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();

router.route('/')
  .get(userController.getAllUsers)
  .delete(userController.deleteUser)
router.route('/likes/:id')
  .get(userController.getAllLikes)

module.exports = router;
