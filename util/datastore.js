const idgen = require('./idgen');

const games = [
	{
		id: 'potato',
		history: []
	},
];

function makeNew() {
	const newGame = {
		id: idgen.newGameID(),
		history: [],
	};
	games.push(newGame);
	return newGame;
}

function getGameState(id) {
	return games.find(game => game.id === id) || null;
}

module.exports = {
	getGameState,
	makeNew,
};
