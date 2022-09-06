
const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, res) => 
      {
        res.send('get all playlist')
      })

router.route('/:id')
  .get((req, res) => {
    res.send('receive a playlist')
  })

router.route('/like/:id')
  .post((req, res) => {
    res.send('You have liked this playlist')
  })

router.route('/unlike/:id')
  .post((req, res) => {
    res.send(' You have unlikes this playlist')
  })

router.route('/create')
  .post((req, res) => { res.send('You have created a playlist') })

router.route('/delete/:id')
  .delete((req, res) => { res.send('you have delete this playlist') })


module.exports = router
