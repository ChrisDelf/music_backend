const express = require('express');
const router = express.Router();

router.post('/',(req, res) => {
  res.send('Register a new User')
})

module.exports = router;
