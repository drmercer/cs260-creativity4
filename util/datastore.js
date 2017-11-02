const idgen = require('./idgen');

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
	const dice = {};
	game.players.forEach(p => dice[p] = []);
	gamePlayerDice[id] = dice;
}

function listAllGames() {
	return games;
}

function getPlayerDice(gameId, playerId) {
	const game = gamePlayerDice[gameId];
	if (!game) throw new Error("Game doesn't exist or isn't started")
	return game[playerId];
}

module.exports = {
	getGameState,
	makeNew,
	listForUser,
	startGame,
	listAllGames,
	getPlayerDice,
};
