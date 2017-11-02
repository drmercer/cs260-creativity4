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

module.exports = {
	getGameState,
	makeNew,
	listForUser,
	startGame,
	listAllGames,
};
