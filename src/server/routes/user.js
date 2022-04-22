var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.send('Aqui usuarios');
})

module.exports = router;