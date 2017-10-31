var express = require('express');
const idgen = require('../util/idgen');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Chip and Dan\'s CP 4',
    newUsername: idgen.newUsername(),
  });
});

module.exports = router;
