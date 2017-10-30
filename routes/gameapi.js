var express = require('express');

const gameDataStore = require('../util/datastore');

var router = express.Router();

router.get('/game/new', function(req, res, next) {
  res.json(gameDataStore.makeNew());
});

/* GET game state by ID. */
router.get('/game/:gameId', function(req, res, next) {
  const gameId = req.params.gameId;
  const gameState = gameDataStore.getGameState(gameId);
  if (gameState) {
    res.json(gameState);
  } else {
    res.status(400).json({ msg: "No game with ID " + gameId })
  }
});

module.exports = router;
