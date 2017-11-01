var express = require('express');

const gameDataStore = require('../util/datastore');

var router = express.Router();

router.get('/game/new/:userId', function(req, res, next) {
  const owner = req.params.userId;
  res.json(gameDataStore.makeNew(owner));
});

/* GET game state by ID. */
router.get('/game/get/:gameId', function(req, res, next) {
  const gameId = req.params.gameId;
  const gameState = gameDataStore.getGameState(gameId);
  if (gameState) {
    res.json(gameState);
  } else {
    res.status(400).json({ msg: "No game with ID " + gameId })
  }
});

router.get('/game/list/:userId', function(req, res) {
  const user = req.params.userId;
  const games = gameDataStore.listForUser(user);
  res.json(games);
});

router.get('/game/start/:gameId', function(req, res) {
  const gameId = req.params.gameId;
  var game = gameDataStore.getGameState(gameId);
  if (game) {
    game.started = true;
    res.json(gameId);
  } else {
res.status(400).json({ msg: "No game with ID " + gameId })
}
});

module.exports = router;
