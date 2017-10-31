var express = require('express');
const idgen = require('human-readable-ids').hri;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Chip and Dan\'s CP 4',
    newUsername: idgen.random().split('-').slice(1).join(''),
  });
});

module.exports = router;
