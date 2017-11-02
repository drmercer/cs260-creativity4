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

router.get('/game/start/:gameId', function(req, res) {
  const gameId = req.params.gameId;
  var game = gameDataStore.getGameState(gameId);
  if (game) {
    gameDataStore.startGame(gameId);
    res.json(gameId);
  } else {
    res.status(400).json({ msg: "No game with ID " + gameId })
  }
});

//======================================================================
//      Gameplay endpoints

router.get('/game/play/:gameId/:userId/dice/', function(req, res) {
  const gameId = req.params.gameId;
  const userId = req.params.userId;
  const dice = gameDataStore.getPlayerDice(gameId, userId);
  res.json(dice);
});

router.put('/game/play/:gameId/:userId/makeGuess/', function(req, res) {
  const userId = req.params.userId;
  const gameId = req.params.gameId;
  
  const game = gameDataStore.getGameState(gameId);
  if (!game) throw new Error("Game not found!");

  if (game.players[game.currentTurn] !== userId) throw new Error("Stahp. It's not your turn buddy.");

  const {qty, side} = req.body;

  if (side < 1 || side > 6) {
    res.status(400).json({msg: "Invalid side \"" + side + "\""});
    return;
  }

  // Validate guess
  const lastGuess = game.history.pop() || {qty: 0, side: 0};
  if (lastGuess.qty < qty
      || (lastGuess.qty === qty && lastGuess.side < side)) {
    // Add to history
    game.history.push({userId, qty, side});
  } else {
    res.status(400).json({msg: "Unacceptable guess."});
    return;
  }

  // Increment turn
  game.currentTurn++;
  game.currentTurn %= game.players.length;

  res.send("Success");
});

router.put('/game/play/:gameId/:userId/callBluff/', function(req, res) {
  const gameId = req.params.gameId;
  // TODO: Code this endpoint
  gameDataStore.rollDice(gameId);
  res.send("Success");
});

module.exports = router;
