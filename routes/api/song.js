
const express = require('express');
const router = express.Router();
const songController = require('../../controllers/songController.js')

router.route('/upload/')
  .post(songController.uploadSong)

router.route('/:id')
  .get(songController.selectSong)


module.exports = router
