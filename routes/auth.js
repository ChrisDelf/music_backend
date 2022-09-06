const express = require('express');
const router = express.Router();


router.post('/',(req, res) => {
 res.send('You have requested a login')
})


module.exports = router

