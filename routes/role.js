const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController')


router.route('/').get(roleController.getAllRoles)


module.exports = router
