const hri = require('human-readable-ids').hri;

function newUsername() {
	return hri.random().split('-').slice(1).join('');
}

function newGameID() {
	return hri.random();
}

module.exports = {
	newUsername,
	newGameID,
}
