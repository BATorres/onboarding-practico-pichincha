var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.send('Aqui roles');
})

module.exports = router;