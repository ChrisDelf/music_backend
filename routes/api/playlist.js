
const express = require('express');
const router = express.Router();
const playlistController = require('../../controllers/playlistController')

router.route('/')
    .get(playlistController.allPlaylists)

router.route('/:id')
  .get(playlistController.selectPlaylist)
  .delete(playlistController.deletePlaylist)

router.route('/like/:id')
  .post((req, res) => {
    res.send('You have liked this playlist')
  })


router.route('/create')
  .post(playlistController.createPlaylist)




module.exports = router
