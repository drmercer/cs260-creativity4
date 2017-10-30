const idgen = require('human-readable-ids').hri;

const games = [
	{
		id: 'potato',
		history: []
	},
];

function makeNew() {
	const newGame = {
		id: idgen.random(),
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
