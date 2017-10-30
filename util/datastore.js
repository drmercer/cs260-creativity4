const games = [
	{
		id: 'potato',
		history: []
	},
];

module.exports = {
	getGameState: function(id) {
		return games.find(game => game.id === id) || null;
	},
};
