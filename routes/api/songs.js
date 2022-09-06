
const express = require('express');
const router = express.Router();


router.route('/upload/')
  .post((req, res) => {res.send("Upload asong")})

router.route('/:id')
  .get((req, res) => {res.send('You have requested a song')})


module.exports = router
