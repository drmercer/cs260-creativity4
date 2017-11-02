var express = require('express');
const idgen = require('../util/idgen');
var router = express.Router();

const datastore = require('../util/datastore');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: "Liar's Dice",
    newUsername: idgen.newUsername(),
  });
});

router.get('/play/:gameId', function(req, res, next) {
  const gameId = req.params.gameId;
  const game = datastore.getGameState(gameId);
  if (!game) {
    next(new Error("Game not found"));
    return;
  }
  res.render('play', {
    newUsername: idgen.newUsername(),
    game: game,
  });
});

module.exports = router;
