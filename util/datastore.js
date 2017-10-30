const games = [
	{
		id: 'potato',
		history: []
	},
];

function getGameState(id) {
	return games.find(game => game.id === id) || null;
}

module.exports = {
	getGameState,
};
