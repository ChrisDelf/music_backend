
const express = require('express');
const addSongController = require('../../controllers/addSongController')
const router = express.Router();


router.route('/:id')
  .get((req, res) => { res.status(200).json({ "message": "test" }) })
  .delete(addSongController.deleteAddSong)
router.route('/create')
  .post(addSongController.createAddSong)


module.exports = router;
