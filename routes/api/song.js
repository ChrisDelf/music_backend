
const express = require('express');
const router = express.Router();
const songController = require('../../controllers/songController.js')

router.route('/')
  .get(songController.getAllSongs)
router.route('/upload/')
  .post(songController.uploadSong)
router.route('/jobs/')
  .get(songController.getAllJobs)
router.route('/:id')
  .get(songController.selectSong)
router.route('/play/:id')
  .get(songController.playSong)
router.route('/download/:id')
  .get(songController.sendSongFile)


module.exports = router
