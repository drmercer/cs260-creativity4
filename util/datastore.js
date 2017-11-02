const idgen = require('./idgen');

const INITIAL_DICE_COUNT = 5;

const games = [];

const gamePlayerDice = {};

function makeNew(owner) {
	const newGame = {
		id: idgen.newGameID(),
		started: false,
		owner: owner,
		players: [ owner ],

		currentTurn: 0,
		history: [],
		winner: null,
	};
	games.push(newGame);
	return newGame;
}

function getRandInt() {
  var randomNumber = Math.floor(Math.random()*6) + 1;
  return randomNumber;
}

function getGameState(id) {
	return games.find(game => game.id === id) || null;
}

function listForUser(username) {
	return games.filter(game => game.players.includes(username));
}

function startGame(id) {
	const game = getGameState(id);
	game.started = true;
	game.playerDiceCounts = {};
	game.players.forEach(p => game.playerDiceCounts[p] = INITIAL_DICE_COUNT);
	gamePlayerDice[id] = {};
	rollDice(id);
}

function listAllGames() {
	return games;
}

function rollDice(id) {
	const game = getGameState(id);
	const gameDice = gamePlayerDice[id];
	if (!gameDice) throw new Error("Game doesn't exist or isn't started");

	game.players.forEach(p => {
		const diceLeft = game.playerDiceCounts[p];
		gameDice[p] = _rollPlayerDice(diceLeft);
	})
}

function _rollPlayerDice(count) {
  const res = [];
	for (let i = 0; i < count; i++) {
		res[i] = _randDieVal();
	}
	return res;
}

function _randDieVal() {
	return Math.floor(Math.random() * 6) + 1;
}

function getPlayerDice(gameId, playerId) {
	const game = gamePlayerDice[gameId];
	if (!game) throw new Error("Game doesn't exist or isn't started")
	return game[playerId];
}

function isGuessCorrect(gameId, {qty, side}) {
	const dice = gamePlayerDice[gameId];
	var count = 0;
	Object.keys(dice).forEach(p => {
		dice[p].forEach(d => {
			if (d === side) count++;
		});
	});
	return count >= qty;
}

function takeDieFromPlayer(gameId, userId) {
	getGameState(gameId).playerDiceCounts[userId]--;
}

function incrementGameTurn(gameId, autoCorrect=true) {
	const game = getGameState(gameId);
	_incrementGameTurnNoCorrect(game);
	_correctGameTurn(game);
}

function _incrementGameTurnNoCorrect(game) {
	game.currentTurn++;
  game.currentTurn %= game.players.length;
}

function _correctGameTurn(game) {
	while (game.playerDiceCounts[game.players[game.currentTurn]] === 0) {
		_incrementGameTurnNoCorrect(game);
	}
}

function setCurrentTurn(gameId, userId) {
	const game = getGameState(gameId);
	game.currentTurn = game.players.indexOf(userId);
	// Rollover to next player with dice
	_correctGameTurn(game);
}

module.exports = {
	getGameState,
	makeNew,
	listForUser,
	startGame,
	listAllGames,
	getPlayerDice,
	rollDice,
	isGuessCorrect,
	takeDieFromPlayer,
	incrementGameTurn,
	setCurrentTurn,
};
