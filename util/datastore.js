const idgen = require('./idgen');

const games = [];

function makeNew(owner) {
	const newGame = {
		id: idgen.newGameID(),
		started: false,
		owner: owner,
		players: [ owner ],
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

function listAllGames() {
	return games;
}

module.exports = {
	getGameState,
	makeNew,
	listForUser,
	listAllGames,
};
