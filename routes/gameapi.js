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

router.get('/game/join/:userId/:gameId', function(req, res) {
  const user = req.params.userId;
  const gameId = req.params.gameId;
  const game = gameDataStore.getGameState(gameId);
  if (!game) {
    res.status(400).json({ msg: "No game with ID " + gameId });
  } else if (game.started) {
    res.status(400).json({ msg: "Game " + gameId + "has already been started!" });
  } else if (game.players.includes(user)) {
    res.status(400).json({ msg: "User " + user + "is already in game " + gameId + "!" });
  } else {
    game.players.push(user);
    res.json(game);
  }
});

router.get('/game/list/:userId?', function(req, res) {
  const user = req.params.userId;
  const games = user
    ? gameDataStore.listForUser(user)
    : gameDataStore.listAllGames();
  res.json(games);
});

module.exports = router;
